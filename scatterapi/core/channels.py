from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from core.models import Comment
from core.serializers import CommentSerializer

class MessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        print(self.user, flush=True)
        if self.user is None:
            self.close()
        self.id = self.scope['url_route']['kwargs']['id']
        self.group_name = f'group_{self.id}'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
    
    @database_sync_to_async
    def get_user(self):
        return User.objects.get(username=self.user)
    
    @database_sync_to_async
    def save_message(self, payload):
        comment_serializer = CommentSerializer(data=payload)
        if comment_serializer.is_valid():
            comment_serializer.save()
            return comment_serializer.data

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat.message',
                'message': message
            }
        )
    async def chat_message(self, event):
        message = event["message"]
        user = await self.get_user()
        payload = {'product': self.id,'text': message,'owner': user.id  }
        message = await self.save_message(payload)
        print(event, flush=True)
        await self.send(text_data=json.dumps({
            'type': 'chat.message',
            'message': message,
        }))