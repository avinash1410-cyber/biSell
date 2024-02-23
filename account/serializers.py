from rest_framework import serializers
from .models import Customer
from django.contrib.auth.models import User
from cart.models import Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','id']

class CustomerSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model=Customer
        fields='__all__'