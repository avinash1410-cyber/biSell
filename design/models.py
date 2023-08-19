from django.db import models
from artist.models import Artist
from cloudinary.models import CloudinaryField

# Create your models here.
class Design(models.Model):
    design=models.CharField(max_length=100,null=True,blank=True)
    artist=models.ForeignKey(Artist,on_delete=models.CASCADE,null=True,blank=True)
    image=CloudinaryField('image',null=True,blank=True)