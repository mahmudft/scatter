


from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, login, register, profile, create_product

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')


urlpatterns = [
    path('', include(router.urls)),
    path('login/', login, name='login'),
    path('create_product/', create_product, name='create_product'),
    path('signup/', register, name='register'),
    path('profile/', profile, name='profile'),
]