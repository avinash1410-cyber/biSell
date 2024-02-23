from .models import Customer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from cart.models import Cart
from order.models import Order
from cart.serializers import CartSerializer
from order.serializers import OrderSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.contrib.auth.models import AnonymousUser






@api_view(('GET','POST'))
def register_page(request):
    if request.method == "POST":
        userName = request.data['username']
        userPass = request.data['password']
        userMail = request.data['email']
        phone=request.data['phone']
        address=request.data['add']
        user = User.objects.create_user(userName, userMail, userPass)
        cust=Customer.objects.create(
            user=user,
            add=address,
            phone=phone,
        )
        cust.save()
        return Response({"message":"Registration done"})
    return Response({"username":"","password":"","email":"","phone":"","add":""})




@api_view(['GET'])
def dashboard_page(request):
    if not request.user.is_authenticated:
        return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        cust = get_object_or_404(Customer, user=request.user)
        my_cart = get_object_or_404(Cart,user=cust)
        my_order = get_object_or_404(Order,user=cust)

        cart_serializer = CartSerializer(my_cart)
        order_serializer = OrderSerializer(my_order)

        data = {
            "cart": cart_serializer.data,
            "order": order_serializer.data
        }
        return Response(data)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
