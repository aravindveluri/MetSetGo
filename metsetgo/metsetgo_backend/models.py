from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    
class Player(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
        ('N', 'Prefer not to say'),
    )

    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=13)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='N')
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

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Venue(models.Model):

    city = models.CharField(max_length=100)
    state= models.CharField(max_length=100)
    pincode= models.CharField(max_length=100)
    country= models.CharField(max_length=100)
    address= models.CharField(max_length=255)
    

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Event(models.Model):

    isPrivate = models.BooleanField(default=False)
    startDateTime= models.DateTimeField() #
    endDateTime= models.DateTimeField() #
    skillMin = models.IntegerField(default=0) 
    skillMax = models.IntegerField(default=0) 
    type = models.CharField(max_length=100, default='', blank=True) 
    details = models.CharField(max_length=500, default='', blank=True) 
    isFull =  models.BooleanField(default=False) 
    hostSkill = models.IntegerField() #


    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, null=False)
    players = models.ManyToManyField(Player, through='PlayerMapEvent')
    host = models.ForeignKey(Player, related_name="host", on_delete=models.CASCADE)
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        PlayerMapEvent.objects.filter(event=self.pk).delete()
        EventMapVenue.objects.filter(event=self.pk).delete()
        return super(self.__class__, self).delete(*args, **kwargs)



    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)

        if created:
            EventMapVenue.objects.create(venue=self.venue, event=self)
        

class PlayerMapEvent(models.Model):

    class Meta:
        unique_together = (('player', 'event'))

    
    PLAYER_TYPE_CHOICES = (
        ('G', 'Guest'),
        ('I', 'Invited'),
        ('R', 'Requested'),
    )

    player= models.ForeignKey(Player,on_delete=models.CASCADE)
    event= models.ForeignKey(Event,on_delete=models.CASCADE)
    playerType= models.CharField(max_length=100, choices=PLAYER_TYPE_CHOICES, default="R")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class EventMapVenue(models.Model):

    STATUS = (
        ('P', 'Pending'),
        ('R', 'Rejected'),
        ('A', 'Approved')
    )

    event = models.OneToOneField(Event,on_delete=models.CASCADE, unique=True, null=False)
    venue = models.ForeignKey(Venue,on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=STATUS, default='P')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
