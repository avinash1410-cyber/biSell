from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from account.models import Customer
from cloudinary.models import CloudinaryField

class Artist(models.Model):
    cust = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    Artist=models.BooleanField(default=False)
    image=CloudinaryField('image',null=True,blank=True)
    
    def __str__(self):
        return str(self.cust)