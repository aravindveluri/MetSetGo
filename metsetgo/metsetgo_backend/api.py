from metsetgo_backend.models import Player
from rest_framework import viewsets, permissions, generics, mixins
from .serializers import BasicPlayerSerializer, OwnerPlayerSerializer
#Player ViewSet

class GetPlayerView(generics.RetrieveAPIView):
    def get_queryset(self):
        return Player.objects.all()
    
    def get_serializer_class(self):
        if not self.request.user.is_anonymous and str(self.request.user.player.id) == self.kwargs['pk']:
            return OwnerPlayerSerializer
        return BasicPlayerSerializer


class UpdatePlayerView(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Player.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        return OwnerPlayerSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]


