from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from core.models import Product
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from knox.auth import AuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer

from .serializers import ProductSerializer, RegisterSerializer
# Create your views here.

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing and editing invoices.
    """

    queryset  = Product.objects.all()
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
# @throttle_classes([LoginThrottle])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.validated_data["user"]
        _, token = AuthToken.objects.create(user)
        return Response({"token": token}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        print(user, flush=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(
        serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def create_product(request):
    user = User.objects.get(username=request.user)
    request.data['user'] = user.id
    # product = Product.objects.create(**request.data, user=user)
    product_serializer = ProductSerializer(data=request.data)
    if product_serializer.is_valid():
        product_serializer.save()
        return Response(product_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    print(request.user, flush=True)
    return Response({}, status=status.HTTP_200_OK)
