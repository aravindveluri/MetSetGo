from metsetgo_backend.models import Player
from rest_framework import viewsets, permissions
from .serializers import BasicPlayerSerializer, OwnerPlayerSerializer

#Player ViewSet
class PlayerViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        if self.request.method == 'GET':
            return Player.objects.all()

        return Player.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if 'pk' in self.kwargs:
            if str(self.request.user.player.id) == self.kwargs['pk']:
                return OwnerPlayerSerializer
        return BasicPlayerSerializer
    

    permission_classes = [
        permissions.IsAuthenticated
    ]

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    
    
