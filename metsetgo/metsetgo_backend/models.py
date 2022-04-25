from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    
class Player(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=13)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    bio = models.TextField(max_length=500, blank=True)

    user = models.OneToOneField(User, related_name="player", on_delete=models.CASCADE, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        self.user.delete()
        return super(self.__class__, self).delete(*args, **kwargs)

class Sport(models.Model):

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)


class Event(models.Model):

    isPrivate = models.BooleanField()
    datetime= models.DateTimeField()
    skillMin = models.IntegerField()
    skillMax = models.IntegerField()
    type = models.CharField(max_length=100)
    details = models.CharField(max_length=500)
    isFull =  models.BooleanField()
    hostSkill = models.IntegerField()
    sport = models.ForeignKey(Sport,on_delete=models.CASCADE,null=True)

class PlayerMapEvent(models.Model):

    player= models.ForeignKey(Player,on_delete=models.CASCADE)
    event= models.ForeignKey(Event,on_delete=models.CASCADE)
    playerType= models.CharField(max_length=100,default="Host")
    

class Venue(models.Model):

    city = models.CharField(max_length=100)
    state= models.CharField(max_length=100)
    pincode= models.CharField(max_length=100)
    country= models.CharField(max_length=100)

class EventMapVenue(models.Model):

    event = models.OneToOneField(Event,on_delete=models.CASCADE, related_name="eventVenue", unique=True, null=False)
    venue = models.ForeignKey(Venue,on_delete=models.CASCADE)
