from django.db import models
from cloudinary.models import CloudinaryField

class Products(models.Model):
    name = models.CharField(max_length=60)
    price = models.IntegerField(default=0)
    image=CloudinaryField('image',null=True,blank=True)
    size=models.CharField(max_length=10,null=True,blank=True)
    @property
    def get_all_products(self):
        return Products.objects.all()
    @property
    def disc_price(self):
        return self.price*self.category.disc

    def __str__(self):
        return self.name