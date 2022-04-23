from django.test import SimpleTestCase
from django.urls import reverse, resolve
from accounts.api import SignUpAPI, SignInAPI, MainUser

class TestUrls(SimpleTestCase):

    # def test_auth_url_resolves(self):
    #     url=reverse('knox-auth')

    def test_register_url_resolves(self):
        url=reverse('knox-register')
        self.assertEquals(resolve(url).func.view_class,SignUpAPI)
    
    def test_login_url_resolves(self):
        url=reverse('knox-login')
    
    def test_user_url_resolves(self):
        url=reverse('knox-user')

    def test_logout_url_resolves(self):
        url=reverse('knox-logout')
