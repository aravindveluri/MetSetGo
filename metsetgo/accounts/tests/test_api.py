from .test_setup import TestSetUp
from django.contrib.auth.models import User


class TestViews(TestSetUp):
    def test_user_cannot_register_with_no_data(self):
        res = self.client.post(self.register_url)
        self.assertEqual(res.status_code, 400)

    def test_user_can_register_correctly(self):
        res = self.client.post(
            self.register_url, self.user_data, format="json")
        # self.assertEqual(res.data['email'], self.user_data['email'])
        # self.assertEqual(res.data['username'], self.user_data['username'])
        self.assertEqual(res.status_code, 200)

    def test_user_login(self):
        self.client.post(
            self.register_url, self.user_data, format="json")
        res = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(res.status_code, 200)

    def test_user_login_with_wrong_cred(self):
        self.client.post(
            self.register_url, self.user_data, format="json")
        res = self.client.post(self.login_url, self.user_data_wrong, format="json")
        self.assertEqual(res.status_code, 400)

    # def test_get_user_data(self):
    #     res = self.client.get(self.user_url)
    #     self.assertEqual(res.status_code, 400)
