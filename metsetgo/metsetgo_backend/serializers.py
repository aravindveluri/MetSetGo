from rest_framework import serializers
from metsetgo_backend.models import *

# Player serializer
class BasicPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'fname', 'lname', 'bio')

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


class EventSerializer(serializers.ModelSerializer):

    host = BasicPlayerSerializer()
    players = BasicPlayerSerializer(many=True)
    venue = VenueSerializer()
    sport = SportSerializer()
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
            'type',
            'details',
            'hostSkill',

            'created_at',
            'updated_at',

            'sport',
            'host',
            'venue',
            'players',
        )

class PlayerEventsSerializer(serializers.ModelSerializer):
    # something = Player.objects.get(id=6)
    # print(something.playermapevent_set.all())
    # print(something.event_set.all())
    # print(something.host.all())

    hosted = EventSerializer(source='host', many=True)
    participated = EventSerializer(source='event_set', many=True)
    
    class Meta:
        model = Player
        fields = ('hosted', 'participated')

class EventRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerMapEvent
        fields = ('player', 'event', 'playerType')
        # read_only_fields = ('created_at','updated_at')

