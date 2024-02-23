from .models import Customer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
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