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
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import BasePermission







class IsAdminOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the user is an admin
        if request.user.is_staff:
            return True

        # Check if the user is the owner of the cart
        return obj.user == request.user






class CartAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        cust = get_object_or_404(Customer, user=request.user)
        if pk:
            try:
                cart = get_object_or_404(Cart,id=pk, user=cust)
                serializer = CartSerializer(cart)
                return Response(serializer.data)
            except Cart.DoesNotExist:
                return Response({"Message": "This Item Does Not Exist"}, status=status.HTTP_404_NOT_FOUND)
        else:
            carts = Cart.objects.filter(user=cust)
            serializer = CartSerializer(carts, many=True)
            return Response(serializer.data)



class CartAPIAdminView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(request.user.username)
        if request.user.is_staff:
            data = Cart.objects.all()
            serializer = CartSerializer(data,many=True)
            return Response(serializer.data)
        else:
            return Response({"Message":"U are Not an Staff user"})


class AddDataAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        cust = Customer.objects.get(user=request.user)
        if cust:
            product = Products.objects.get(id=pk)
            cart = Cart.objects.create(product=product, user=cust)
            cart.save()
            return redirect("MyCart")
        else:
            return Response({"Message": "First Made an Account"})


class DeleteDataAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    def delete(self, request, pk=None, format=None):
        cart = get_object_or_404(Cart, id=pk)
        cart.delete()
        return Response({"message": "Cart deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
