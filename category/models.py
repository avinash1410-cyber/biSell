from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=100,null=True,blank=True)
    image=CloudinaryField('image')
    def __str__(self):
        return self.name