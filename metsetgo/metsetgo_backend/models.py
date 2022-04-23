from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    
class Player(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    email = models.EmailField(max_length=100, unique=True)
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=13)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    bio = models.TextField(max_length=500, blank=True)

    owner = models.ForeignKey(User, related_name="players", on_delete=models.CASCADE, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

