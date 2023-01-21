from django.db import models
from product.models import Products
from account.models import Customer

# Create your models here.
class Cart(models.Model):
    product=models.ForeignKey(Products,null=True,blank=True,on_delete=models.CASCADE)
    user=models.ForeignKey(Customer,null=True,blank=True,on_delete=models.CASCADE)

    def __str__(self):
        return self.product.name+""+str(self.id)