from rest_framework.test import APITestCase
from django.urls import reverse
# from authentication.models import User


class TestSetUp(APITestCase):

    def setUp(self):
        self.register_url = reverse('auth_register')
        self.login_url = reverse('token_obtain_pair')
        # self.user_url = reverse('user')

        self.user_data = {
            'fname':'a',
            'email': 'ab@ab.com',
            'username': "ab",
            'password': "ithas8chars",
            'password2': "ithas8chars"
        }
        self.user_data_wrong = {
            'fname':'a',
            'email': 'ab@ab.com',
            'username': "ab",
            'password': "ithas9chars",
            'password2': "ithas9chars"
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()