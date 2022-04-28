from rest_framework.test import APITestCase
from django.urls import reverse
# from authentication.models import User


class TestSetUp(APITestCase):

    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.user_url = reverse('user')

        self.user_data = {
            'fname':'a',
            'email': 'ab@ab.com',
            'username': "ab",
            'password': "ab",
        }
        self.user_data_wrong = {
            'fname':'a',
            'email': 'ab@ab.com',
            'username': "ab",
            'password': "abc",
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()