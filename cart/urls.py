from django.urls import path
from .views import CartAPIView,AddDataAPIView,DeleteDataAPIView,CartAPIAdminView

urlpatterns = [
    path('',CartAPIView.as_view(),name="MyCart"),
    path('<int:pk>/',CartAPIView.as_view()),
    path('addData/<int:pk>/',AddDataAPIView.as_view()),
    path('DeleteData/<int:pk>/',DeleteDataAPIView.as_view()),
    path('admin/',CartAPIAdminView.as_view()),
]