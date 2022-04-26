from metsetgo_backend.models import *
from rest_framework import viewsets, permissions, generics, mixins
from .serializers import *
from django.db.models import Q
from django.utils import timezone
import json

# Player ViewSet
# Get the public information available to all the users
class GetPlayerView(generics.RetrieveAPIView):
    def get_queryset(self):
        return Player.objects.all()
    
    def get_serializer_class(self):
        if not self.request.user.is_anonymous and str(self.request.user.player.id) == self.kwargs['pk']:
            return OwnerPlayerSerializer
        return BasicPlayerSerializer


# Get the full information available to only current user
class UpdatePlayerView(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Player.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        return OwnerPlayerSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]


## EVENT CRUD
# Get all the public events & user specific private events
class GetEventsView(generics.RetrieveAPIView, generics.ListAPIView):
    def get_queryset(self):
        now = timezone.now()
        return Event.objects.filter(
            (
                (
                    Q(isPrivate=False)
                ) | 
                (
                    Q(players__id=self.request.user.player.id) & 
                    Q(isPrivate=True) 
                )
            ) &
            (
                Q(endDateTime__gt=now) &
                ~Q(eventVenue__status='R')
            )
        )
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs) if 'pk' in self.kwargs else super().list(request, *args, **kwargs)

    def get_serializer_class(self):
        return EventSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

# Create Event API
class CreateEventView(generics.CreateAPIView):
    def get_queryset(self):
        return Event.objects.all()
    
    def get_serializer_class(self):
        return EventSerializer

    def create(self, request, *args, **kwargs):
        request.data.update({'host': request.user.player.id})
        return super().create(request, *args, **kwargs)

    permission_classes = [
        permissions.IsAuthenticated
    ]

# Update & Destory Event API
class UpdateEventView(generics.UpdateAPIView, generics.DestroyAPIView):
    def get_queryset(self):
        return Event.objects.filter(host=self.request.user.player)
    
    def get_serializer_class(self):
        return EventSerializer

    def update(self, request, *args, **kwargs):
        request.data.update({'host': request.user.player.id})
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    permission_classes = [
        permissions.IsAuthenticated
    ]

# Player event history
# class PlayerEventView(generics.RetrieveAPIView):
#     def get_queryset(self):
#         return Event.objects.filter(
#             Q(host=self.request.user.player) | 
#             Q(players__pk=self.request.user.player.id)
#         )
    
#     def get_serializer(self, *args, **kwargs):
#         return EventSerializer
    
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]
