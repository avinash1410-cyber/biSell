from django.db import models
from artist.models import Artist
from category.models import Category
from cloudinary.models import CloudinaryField

from design.models import Design



class Products(models.Model):
    name = models.CharField(max_length=60)
    price = models.IntegerField(default=0)
    artist=models.ForeignKey(Artist, on_delete=models.CASCADE, null=True,blank=True)
    cat=models.ForeignKey(Category, on_delete=models.SET_NULL, null=True,blank=True)
    image=CloudinaryField('image',null=True,blank=True)
    image1=CloudinaryField('image',null=True,blank=True)
    image2=CloudinaryField('image',null=True,blank=True)
    image3=CloudinaryField('image',null=True,blank=True)
    image4=CloudinaryField('image',null=True,blank=True)
    design=models.ForeignKey(Design,null=True,blank=True,on_delete=models.SET_NULL)
    size=models.CharField(max_length=10,null=True,blank=True)
    @property
    def get_all_products(self):
        return Products.objects.all()
    @property
    def disc_price(self):
        return self.price*self.category.disc

    def __str__(self):
        return self.name