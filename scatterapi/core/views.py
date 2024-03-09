from datetime import timezone
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from core.models import Product
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, JSONParser
from knox.auth import AuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.shortcuts import get_object_or_404
from .serializers import ProductSerializer, RegisterSerializer
from core.redconf import redcon

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing and editing invoices.
    """

    queryset  = Product.objects.filter(visiable=True).order_by('-created_at')
    serializer_class = ProductSerializer

    def list(self, request):
        f"""
        List all  products made my different users.
        
        :param request: The request object.
        :return: List of {Product}.
        """

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk=None):

        """
        Retrieve a specific invoice of the authenticated user.
        :param pk: ID of invoice .
        """

        queryset = self.queryset.filter(id=pk)
        invoice = get_object_or_404(queryset, id=pk)
        serializer = self.get_serializer(invoice)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@parser_classes([MultiPartParser,JSONParser ])
def login(request):
    print(request.data, flush=True)
    serializer = AuthTokenSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.validated_data["user"]
        _, token = AuthToken.objects.create(user)
        return Response({"token": token}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@parser_classes([MultiPartParser, JSONParser])
def register(request):
    print(request.data, flush=True)
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        print(user, flush=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors, flush=True)
        return Response(
        serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser,JSONParser ])
def create_product(request):
    user = User.objects.get(username=request.user)
    product_serializer = ProductSerializer(data=request.data)
    if product_serializer.is_valid():
        product_serializer.save(user=user)
        return Response(product_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    print(request.user, flush=True)
    return Response({}, status=status.HTTP_200_OK)



@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def activate_product(request, id):
        id = redcon.get(id)
        product = get_object_or_404(Product, id=id)
        if product.user.username == request.user:
            if request.method == "GET":
              return Response({}, status=status.HTTP_200_OK)
            else:
                product.save(visiable=True, updated_at= timezone.now())
                return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)


