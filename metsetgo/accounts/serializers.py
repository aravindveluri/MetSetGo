from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

from metsetgo_backend.models import Player
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    fname = serializers.CharField()
    lname = serializers.CharField(required=False, default='')
    phone = serializers.CharField(required=False, default='')
    gender = serializers.CharField(required=False, default='')
    bio = serializers.CharField(required=False, default='')
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'fname', 'lname', 'phone', 'gender', 'bio')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        Player.objects.create(
            user_id=user.id,
            fname=validated_data["fname"],
            lname=validated_data["lname"],
            phone=validated_data["phone"],
            gender=validated_data["gender"],
            bio=validated_data["bio"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials Passed.')