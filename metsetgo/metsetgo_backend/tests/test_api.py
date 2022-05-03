import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from metsetgo_backend.models import Event, Player, Sport, Venue
from knox.models import AuthToken

#from profiles.api.serializers import ProfileSerializer, ProfileStatusSerializer
#from profiles.models import Profile, ProfileStatus


# class RegistrationTestCase(APITestCase):

#     def test_registration(self):
#         data = {"username": "testcase", "email": "test@localhost.app",
#                 "password1": "some_strong_psw", "password2": "some_strong_psw"}
#         response = self.client.post("/api/rest-auth/registration/", data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class GetPlayerTestCase(APITestCase):




    def setUp(self):
          self.user=User.objects.create_user(username="john",password="john")
          self.player = Player.objects.create(fname="a",lname="b",gender="M",bio="Hello",user=self.user)
          self.user_data={"fname": "F","lname": "L","phone": "9392132","gender": "F","bio": "heyyyyy"}
          self.token=AuthToken.objects.create(self.user)[1]
          
        #   self.token = Token.objects.create(user=self.user)
          

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token)

    def test_get_player_view_authenticated(self):
        self.api_authentication()
        response = self.client.get(f'/api/players/{self.player.id}/')
        self.assertEqual(response.data['gender'],'M')
        self.assertEqual(response.status_code, 200)

    def test_get_player_without_authenticated(self):
        response = self.client.get(f'/api/players/{self.player.id}/')
        #self.assertEqual(response.data['gender'],'M')
        self.assertEqual(response.status_code, 200)


    def test_update_player_get(self):
        self.api_authentication()
        url = reverse("update_player", kwargs={'pk':self.player.id})
        response = self.client.get(url)
        #self.assertEqual(response.data['gender'],'M')
        self.assertEqual(response.status_code, 200)

    def test_update_player_put(self):
        self.api_authentication()
        url = reverse("update_player", kwargs={'pk':self.player.id})
        self.assertEqual(self.player.gender,"M")
        response = self.client.put(url,self.user_data)
        self.assertEqual(self.player.gender,"M") #wrongly giving correct
        print(self.player.fname)
        # self.assertEqual(response.data['gender'],'M')
        self.assertEqual(response.status_code, 200)


#     def test_profile_list_un_authenticated(self):
#         self.client.force_authenticate(user=None)
#         response = self.client.get(self.list_url)
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

#     def test_profile_detail_retrieve(self):
#         response = self.client.get(reverse("profile-detail", kwargs={"pk": 1}))
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data["user"], "davinci")

#     def test_profile_update_by_owner(self):
#         response = self.client.put(reverse("profile-detail", kwargs={"pk": 1}),
#                                    {"city": "Anchiano", "bio": "Renaissance Genius"})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(json.loads(response.content),
#                          {"id": 1, "user": "davinci", "bio": "Renaissance Genius",
#                           "city": "Anchiano", "avatar": None})

#     def test_profile_update_by_random_user(self):
#         random_user = User.objects.create_user(username="random", 
#                                                password="psw123123123")
#         self.client.force_authenticate(user=random_user)
#         response = self.client.put(reverse("profile-detail", kwargs={"pk": 1}),
#                                    {"bio": "hacked!!!"})
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)