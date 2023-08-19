import re
from django.shortcuts import redirect
from rest_framework.views import APIView

from account.models import Customer
from product.models import Products
from .models import Cart
from .serializers import CartSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view





class CartAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, pk=None, format=None):
        if pk:
            print(pk)
            cust=Customer.objects.get(user=request.user)
            data = Cart.objects.get(id=pk,user=cust)
            if data is None:
                return Response({"Message":"This Item Not exist"})
            serializer = CartSerializer(data)
            return Response(serializer.data)
        else:
            cust=Customer.objects.get(user=request.user)
            if cust!=None:
                data = Cart.objects.filter(user=cust)
                serializer = CartSerializer(data,many=True)
                return Response(serializer.data)




class AddDataAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, pk=None, format=None):
        cust=Customer.objects.get(user=request.user)
        if cust!=None:
            product=Products.objects.get(id=pk)
            cart=Cart.objects.create(product=product,user=cust)
            cart.save()
            return redirect("MyCart")
        else:
            return Response({"Message":"First Made an Acoount"})
        


@api_view(['GET'])
def DeleteFromCart(request,pk=None):
    print(pk)
    item = Cart.objects.get(id=pk)
    item.delete()
    return Response({'message': "Your Cart Item Has Been Deleted"})