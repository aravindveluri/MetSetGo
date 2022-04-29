from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from metsetgo_backend.models import Player


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

class RegisterSerializer(serializers.ModelSerializer):
    fname = serializers.CharField(source='player.fname')
    lname = serializers.CharField(required=False, default='', source='player.lname')
    phone = serializers.CharField(required=False, default='', source='player.phone')
    gender = serializers.CharField(required=False, default='', source='player.gender')
    bio = serializers.CharField(required=False, default='', source='player.bio')

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'fname', 'lname', 'phone', 'gender', 'bio')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create(
            username=validated_data['username']
        )
        Player.objects.create(
            user_id=user.id,
            fname=validated_data["player"]["fname"],
            lname=validated_data["player"]["lname"],
            phone=validated_data["player"]["phone"],
            gender=validated_data["player"]["gender"],
            bio=validated_data["player"]["bio"],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

        