from django.test import TestCase
from metsetgo_backend.models import Player

class TestModels(TestCase):
     
     def setUp(self):
         self.player1=Player.objects.create(name='',a=3,)
         