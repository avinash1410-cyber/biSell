# Create your views here.
from rest_framework.views import APIView

from product.models import Products
from product.serializers import ProductSerializer
from .models import Design
from rest_framework.response import Response
from .serializers import DesignSerilaizer
class DesignsAPIView(APIView):
    def get(self,request,pk=None):
        if pk:
            design=Design.objects.get(id=pk)
            data=DesignSerilaizer(design)
            return Response(data.data)
        designs=Design.objects.all()
        data=DesignSerilaizer(designs,many=True)
        return Response(data.data)

class DesignProductsAPIView(APIView):
    def get(self,request,pk=None):
        if pk:
            design=Design.objects.get(id=pk)
            products=Products.objects.filter(design=design)
            data=ProductSerializer(products,many=True)
            return Response(data.data)
        



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import DesignSerilaizer

@api_view(['POST'])
def upload_design(request):
    if request.method == 'POST':
        serializer = DesignSerilaizer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Design uploaded successfully.', 'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


