"""
ASGI config for scatterapi project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "scatterapi.settings")

application = get_asgi_application()

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from .middleware import QueryAuthMiddleware
# from . import urls 

# application = ProtocolTypeRouter(
#     {
#         "http": get_asgi_application(),
#         "websocket": QueryAuthMiddleware(URLRouter(urls.websocket_urlpatterns))
#     }
# )