from metsetgo_backend.models import *
from rest_framework import permissions, generics
from .serializers import BasicPlayerSerializer, OwnerPlayerSerializer, EventSerializer, PlayerEventsSerializer, EventRequestSerializer, SportSerializer, VenueSerializer, GetEventSerializer
from django.db.models import Q
from django.utils import timezone
from rest_framework.response import Response

import logging
logger = logging.getLogger(__name__)

# Player ViewSet
# Get the public information available to all the users
class GetPlayerView(generics.RetrieveAPIView):
    lookup_field = "user_id"
    
    def get_queryset(self):
        logger.debug("GetPlayerView accessed")
        return Player.objects.all()
    
    def get_serializer_class(self):
        if not self.request.user.is_anonymous and str(self.request.user.id) == self.kwargs['user_id']:
            logger.info("Fetching player " + str(self.request.user.id))
            return OwnerPlayerSerializer
        return BasicPlayerSerializer


# Get the full information available to only current user
class UpdatePlayerView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "user_id"
    
    def get_queryset(self):
        logger.debug("UpdatePlayerView accessed")
        logger.info("Updating player" + str(self.request.user.id))
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
                Q(isPrivate=False) |
                Q(players__id=self.request.user.player.id)
            ) &
            (
                Q(endDateTime__gt=now) &
                ~Q(eventmapvenue__status='R')
            )
        ).distinct() if 'pk' not in self.kwargs else Event.objects.filter(pk=self.kwargs["pk"])
    
    def get(self, request, *args, **kwargs):
        logger.debug("GetEventsView accessed")
        logger.info("Listing events")
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
        logger.debug("CreateEventView accessed")
        logger.info("Creating event for player" + str(request.user.player.id))
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
        logger.debug("UpdateEventView accessed")
        logger.info("Updating event for player")
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
        logger.debug("UpdateEventView accessed")
        logger.info("Destroying event" + str(self.pk))
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
        logger.debug("JoinEventView accessed")
        return PlayerMapEvent.objects.all()
    def get_serializer_class(self):
        return EventRequestSerializer

    def create(self, request, *args, **kwargs):
        request.data.update({'player': request.user.player.id})
        return super().create(request, *args, **kwargs)
    
    permission_classes = [
        permissions.IsAuthenticated
    ]

 #get players
class EventPlayerView(generics.ListAPIView):

    def get_queryset(self):
        logger.debug("EventPlayerView accessed")
        eventId=self.kwargs['pk']
        print(PlayerMapEvent.objects.filter(event_id=eventId))
        return PlayerMapEvent.objects.filter(event_id=eventId)

    def get_serializer_class(self):
        return GetEventRequestSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]


class GetSportsView(generics.ListAPIView):
    def get_queryset(self):
        logger.debug("GetSportsView accessed")
        return Sport.objects.all()
    
    def get_serializer_class(self):
        return SportSerializer

class GetVenuesView(generics.ListAPIView):
    def get_queryset(self):
        logger.debug("GetVenuesView accessed")
        return Venue.objects.all()
    
    def get_serializer_class(self):
        return VenueSerializer
