from django.urls import path,include
from account.views import *

urlpatterns = [
    path('register/',register_page),
    path('dashboard/',dashboard_page),
]