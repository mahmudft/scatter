from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "scatterapi.settings")

app = Celery("scatterapi")
app.conf.enable_utc = False
app.conf.update(timezone = 'Asia/Baku')
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
