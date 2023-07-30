from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    ci = models.CharField(max_length=10, default='')

    def __str__(self):
        return self.first_name + " " + self.last_name