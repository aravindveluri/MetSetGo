from metsetgo_backend.models import Player
from rest_framework import viewsets, permissions
from .serializers import PlayerSerializer

#Player ViewSet
class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PlayerSerializer
    
