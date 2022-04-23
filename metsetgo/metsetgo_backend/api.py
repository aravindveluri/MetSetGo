from metsetgo_backend.models import Player
from rest_framework import viewsets, permissions
from .serializers import BasicPlayerSerializer, OwnerPlayerSerializer

#Player ViewSet
class PlayerViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Player.objects.all()
    
    def get_serializer_class(self):
        if str(self.request.user.player.id) == self.kwargs['pk']:
            return OwnerPlayerSerializer
        return BasicPlayerSerializer

    

    permission_classes = [
        permissions.IsAuthenticated
    ]

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    
    
