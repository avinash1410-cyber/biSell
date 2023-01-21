from rest_framework import serializers
from .models import Artist
from account.serializers import CustomerSerializer

class ArtistSerializer(serializers.ModelSerializer):
    cust=CustomerSerializer()
    class Meta:
        model=Artist
        fields='__all__'
