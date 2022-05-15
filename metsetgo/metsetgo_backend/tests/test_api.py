
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from accounts.serializers import MyTokenObtainPairSerializer
from metsetgo_backend.models import Player

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
          self.token = MyTokenObtainPairSerializer.get_token(self.user)
          
        #   self.token = Token.objects.create(user=self.user)
          

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + str(self.token.access_token))

    def test_get_player_view_authenticated(self):
        self.api_authentication()
        response = self.client.get(reverse('get_player', kwargs={"user_id": self.user.pk}))
        self.assertEqual(response.data['gender'],'M')
        self.assertEqual(response.status_code, 200)

    def test_get_player_without_authenticated(self):
        response = self.client.get(reverse('get_player', kwargs={"user_id": self.user.pk}))
        #self.assertEqual(response.data['gender'],'M')
        self.assertEqual(response.status_code, 200)


    def test_update_player_get(self):
        self.api_authentication()
        url = reverse("edit_player", kwargs={'user_id':self.user.id})
        response = self.client.get(url)
        #self.assertEqual(response.data['gender'],'M')
        self.assertEqual(response.status_code, 200)

    def test_update_player_put(self):
        self.api_authentication()
        url = reverse("edit_player", kwargs={'user_id':self.user.id})
        self.assertEqual(self.player.gender,"M")
        response = self.client.put(url,self.user_data)
        self.assertEqual(self.player.gender,"M") #wrongly giving correct
        print(self.player.fname)
        # self.assertEqual(response.data['gender'],'M')
        self.assertEqual(response.status_code, 200)

