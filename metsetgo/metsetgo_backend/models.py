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

