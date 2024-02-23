from rest_framework.views import APIView

from account.models import Customer
from product.models import Products
from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from cart.views import IsAdminOrOwner
from django.shortcuts import get_object_or_404
from rest_framework import status




class OrderAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        cust = get_object_or_404(Customer, user=request.user)
        if pk:
            try:
                order = get_object_or_404(Order,id=pk, user=cust)
                serializer = OrderSerializer(order)
                return Response(serializer.data)
            except Order.DoesNotExist:
                return Response({"Message": "This Item Does Not Exist"}, status=status.HTTP_404_NOT_FOUND)
        else:
            carts = Order.objects.filter(user=cust)
            serializer = OrderSerializer(carts, many=True)
            return Response(serializer.data)

class OrderAPIAdminView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, pk=None, format=None):
        if request.user.is_staff:
            data = Order.objects.all()
            serializer = OrderSerializer(data,many=True)
            return Response(serializer.data)
        else:
            return Response({"Message":"U are Not an Staff user"})


class AddDataAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, pk=None, format=None):
        cust=Customer.objects.get(user=request.user)
        if cust!=None:
            product=Products.objects.get(id=pk)
            if int(product.stocks)<=0:
                return Response({"Message":"The Stock Of the Product has finished"})
            order=Order.objects.create(product=product,user=cust,address="Lucknow")
            order.save()
            product.stocks =int(product.stocks)-1
            product.save()
            return Response({"Message":"Sucess"})
        else:
            return Response({"Message":"First Made an Acoount"})
        


class DeleteDataAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    def delete(self, request, pk=None, format=None):
        order = get_object_or_404(Order, id=pk)
        product = order.product
        order.delete()
        product.stocks =int(product.stocks)+1
        product.save()
        return Response({"message": "Order deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
