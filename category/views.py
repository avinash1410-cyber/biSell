from rest_framework.response import Response
from product.models import Products
from .models import Category
from rest_framework.views import APIView
from .serializers import CategorySerializer
from product.serializers import ProductSerializer


# Create your views here.
class CategoryAPIView(APIView):
    def get(self,request,pk=None):
        if pk is None:
            products=Products.objects.all()       
        else:
            cat = Category.objects.get(id=pk)
            print(cat)
            products=Products.objects.filter(cat=cat)             
        serializer=ProductSerializer(products,many=True)
        return Response(serializer.data)

class AvailableCategory(APIView):
    def get(self,request):
        cat = Category.objects.all()
        serializer=CategorySerializer(cat,many=True)
        return Response(serializer.data)