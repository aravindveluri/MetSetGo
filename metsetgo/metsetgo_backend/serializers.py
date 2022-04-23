from rest_framework import serializers
from metsetgo_backend.models import Player

# Player serializer
class BasicPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'fname', 'lname', 'bio')

class OwnerPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('__all__')
