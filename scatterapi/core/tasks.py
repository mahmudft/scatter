from datetime import timedelta, datetime, timezone
from celery import shared_task
import redis
import uuid
from core.models import Product
from django.core.mail import send_mail
from django.shortcuts import render

from core.redconf import redcon




def send_activation_email( message, reciever):
    subject = 'Product Activation link'
    message = message
    from_email = 'fatullayevm@gmail.com' 
    recipient_list = [reciever] 

    send_mail(subject, message, from_email, recipient_list)


@shared_task()
def check_db_transactions():
   threshold_time = timezone.now() - timedelta(minutes=2)

   old_products = Product.objects.filter(updated_at__lte=threshold_time)

   for product in old_products:
      user_email = product.user.email
      product.visiable = False
      product.save()
      uid = uuid.uuid4()
      message = f'Link for product activation http://localhost:3000/activate/{uid}'
      redcon.set(uid, product.id)
      send_activation_email(message,user_email)
 