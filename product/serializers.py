from rest_framework import serializers
from .models import Products
from artist.serializers import ArtistSerializer
from category.serializers import CategorySerializer
from design.serializers import DesignSerilaizer

class ProductSerializer(serializers.ModelSerializer):
    artist=ArtistSerializer()
    cat=CategorySerializer()
    design=DesignSerilaizer()
    class Meta:
        model=Products
        ordering = ['-created']
        fields='__all__'