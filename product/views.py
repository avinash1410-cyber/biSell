from rest_framework.views import APIView
from .models import Products
from .serializers import ProductSerializer
from rest_framework.response import Response
from django.db.models import Q
from cloudinary.forms import cl_init_js_callbacks      




class ProductSearchAPIView(APIView):
    def get(self,request,query=None):
        print("PRINTING THE SLUG",query)
        products=Products.objects.filter(
                              Q(name__icontains=query))
        data=ProductSerializer(products,many=True)
        return Response(data.data)



class Home(APIView):
    def get(self,*args,**kwargs):
        data = Products.objects.all()
        serializer = ProductSerializer(data,many=True)
        return Response(serializer.data)


class ProductAPIView(APIView):
   # permission_classes=[IsAuthenticated]
    def get(self, request, pk=None, format=None):
        data = Products.objects.get(id=pk)
        if data is None:
            return Response({"message":"Not valid id"})
        serializer = ProductSerializer(data)
        return Response(serializer.data)