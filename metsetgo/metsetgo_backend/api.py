from metsetgo_backend.models import Player
from rest_framework import viewsets, permissions
from .serializers import PlayerSerializer

#Player ViewSet
class PlayerViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PlayerSerializer
    
    def get_queryset(self):
        return self.request.user.players.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    
