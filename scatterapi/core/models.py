from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User,related_name='products', on_delete=models.CASCADE)
    title = models.CharField(max_length=300, blank=False, null=False)
    description = models.CharField(max_length=300, blank=False, null=False)
    price = models.FloatField(null=False, blank=False)
    image = models.ImageField(upload_to='product_images/')
    contact = models.EmailField(null=False, blank=False)
    visiable=models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table="product"
    
    def save(self, *args, **kwargs):
        self.price = float(self.price)
        super().save(*args, **kwargs)

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    owner=models.ForeignKey(User, related_name='owner', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table="comment"
