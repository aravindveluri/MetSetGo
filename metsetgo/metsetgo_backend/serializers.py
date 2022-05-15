from rest_framework import serializers
from metsetgo_backend.models import *

# Player serializer
class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id')
class BasicPlayerSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer()
    class Meta:
        model = Player
        fields = ('id', 'fname', 'lname', 'bio', 'user')

class GetEventRequestSerializer(serializers.ModelSerializer):
    player = BasicPlayerSerializer()
    class Meta:
        model = PlayerMapEvent
        fields = ('player', 'event', 'playerType')

class OwnerPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('__all__')

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ('id', 'address', 'pincode', 'city', 'state', 'country')

class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ('id', 'name', 'type')

class EventMapVenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventMapVenue
        fields = ('status',)

class GetEventSerializer(serializers.ModelSerializer):
    sport = SportSerializer()
    venue = VenueSerializer()
    host = BasicPlayerSerializer()
    playerMapEvents = GetEventRequestSerializer(source='playermapevent_set', many=True)
    venueStatus = EventMapVenueSerializer(source='eventmapvenue')
    class Meta:
        model = Event
        fields = (
            'id',
            'startDateTime',
            'endDateTime',
            'isPrivate',
            'isFull',
            'skillMin',
            'skillMax',
            'details',
            'hostSkill',

            'created_at',
            'updated_at',

            'sport',
            'host',
            'venue',
            # 'players',
            'playerMapEvents',
            'venueStatus'
        )
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'id',
            'startDateTime',
            'endDateTime',
            'isPrivate',
            'isFull',
            'skillMin',
            'skillMax',
            'details',
            'hostSkill',

            'created_at',
            'updated_at',

            'sport',
            'host',
            'venue',
        )

class PlayerEventsSerializer(serializers.ModelSerializer):

    hosted = GetEventSerializer(source='host', many=True)
    participated = GetEventSerializer(source='event_set', many=True)
    
    class Meta:
        model = Player
        fields = ('hosted', 'participated')

class EventRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerMapEvent
        fields = ('player', 'event', 'playerType')

# Get
