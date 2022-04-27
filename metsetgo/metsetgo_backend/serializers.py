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

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('__all__')

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
