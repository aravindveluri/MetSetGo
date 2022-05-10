from cgitb import lookup
from metsetgo_backend.models import *
from rest_framework import viewsets, permissions, generics, mixins
from .serializers import BasicPlayerSerializer, OwnerPlayerSerializer, EventSerializer, PlayerEventsSerializer, EventRequestSerializer, SportSerializer, VenueSerializer, GetEventSerializer
from django.db.models import Q
from django.utils import timezone

from rest_framework import status
from rest_framework.response import Response
from rest_framework.settings import api_settings

# Player ViewSet
# Get the public information available to all the users
class GetPlayerView(generics.RetrieveAPIView):
    lookup_field = "user_id"
    
    def get_queryset(self):
        return Player.objects.all()
    
    def get_serializer_class(self):
        if not self.request.user.is_anonymous and str(self.request.user.id) == self.kwargs['user_id']:
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
                    Q(isPrivate=True) |
                    Q(players__id=self.request.user.player.id)
                )
            ) &
            (
                Q(endDateTime__gt=now) &
                ~Q(eventmapvenue__status='R')
            )
        ) if 'pk' not in self.kwargs else Event.objects.filter(pk=self.kwargs["pk"])
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs) if 'pk' in self.kwargs else super().list(request, *args, **kwargs)

    def get_serializer_class(self):
        return GetEventSerializer

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
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)
        playerMapEvents = request.data["playerMapEvents"]
        playerIDs = dict(zip(list(map(lambda pme: pme["id"], playerMapEvents)), list(map(lambda pme: pme["status"], playerMapEvents))))
        playerEvents = PlayerMapEvent.objects.filter((Q(event=instance.pk) & Q(player__in=playerIDs.keys())))

        for playerEventObj in playerEvents:
            playerEventObj.playerType = playerIDs[playerEventObj.player.id]
            playerEventObj.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    permission_classes = [
        permissions.IsAuthenticated
    ]

# Player event history
class PlayerEventsView(generics.RetrieveAPIView):
    lookup_field = "user_id"
    
    def get_queryset(self):
        return Player.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        return PlayerEventsSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]


class JoinEventView(generics.CreateAPIView):
    def get_queryset(self):
        return PlayerMapEvent.objects.all()
    def get_serializer_class(self):
        return EventRequestSerializer

    def create(self, request, *args, **kwargs):
        request.data.update({'player': request.user.player.id})
        return super().create(request, *args, **kwargs)
    
    permission_classes = [
        permissions.IsAuthenticated
    ]


class GetSportsView(generics.ListAPIView):
    def get_queryset(self):
        return Sport.objects.all()
    
    def get_serializer_class(self):
        return SportSerializer

class GetVenuesView(generics.ListAPIView):
    def get_queryset(self):
        return Venue.objects.all()
    
    def get_serializer_class(self):
        return VenueSerializer
