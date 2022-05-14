import datetime
from turtle import title
from unicodedata import name

from django.contrib.auth.models import User
from django.test import TestCase
from metsetgo_backend.models import Event, Player, Sport, Venue


class ModelTesting(TestCase):

    def setUp(self):
        self.user=User.objects.create_user(username="john",password="john")
        self.player = Player.objects.create(fname="a",lname="b",gender="M",bio="Hello",user=self.user)
        self.sport= Sport.objects.create(name="Cricket",type="Outdoor")
        print(self.player.pk)
        self.venue= Venue.objects.create(city="ban",address="aa")
        self.event= Event.objects.create(isPrivate=True,startDateTime="2021-12-12 11:44:59",endDateTime="2021-12-12 11:44:59",hostSkill="4",sport=self.sport,venue=self.venue,host=self.player)

    def test_player_model(self):
        p=self.player
        self.assertTrue(isinstance(p,Player))
    

    def test_delete_player(self):
        pk = self.player.pk
        user_pk = self.user.pk
        event_pk = self.event.host.pk
        get_player = Player.objects.get(pk=pk)
        get_player.delete()
        self.assertFalse(Player.objects.filter(pk=pk).exists())
        self.assertFalse(User.objects.filter(pk=user_pk).exists())
        self.assertFalse(Event.objects.filter(pk=event_pk).exists())
    #    
    def test_sport_model(self):
        p=self.sport
        self.assertTrue(isinstance(p,Sport))

    def test_venue_model(self):
        p=self.venue
        self.assertTrue(isinstance(p,Venue))
    
    def test_event_model(self):
        p=self.event
        self.assertTrue(isinstance(p,Event))
