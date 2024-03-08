from channels.db import database_sync_to_async
from knox.auth import TokenAuthentication
from urllib.parse import parse_qs
from rest_framework.authtoken.models import Token
from asgiref.sync import sync_to_async


@database_sync_to_async
async def get_user_from_context(scope):
    token = parse_qs(scope['query_string'].decode('utf-8')).get('token')[0].encode('ascii')
    tk = Token.objects.get(key=token)
    print(tk, flush=True)
    auth = TokenAuthentication()
    user = auth.authenticate_credentials(token)
    print(f"User: {user}", flush=True)
    return user

class QueryAuthMiddleware:
    """
    Custom middleware that takes token from querystirng and sends message back to specific user.
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        try:
            auth = TokenAuthentication()
            token = parse_qs(scope['query_string'].decode('utf-8')).get('token')[0].encode('ascii')
            user, _ = await sync_to_async(auth.authenticate_credentials)(token)
            scope['user'] = user
        except:
            scope['user'] = None

        return await self.app(scope, receive, send)