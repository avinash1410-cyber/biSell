from django.urls import path
from .views import CartAPIView,AddDataAPIView

urlpatterns = [
    path('',CartAPIView.as_view(),name="MyCart"),
    path('<int:pk>/',CartAPIView.as_view()),
    path('addData/<int:pk>/',AddDataAPIView.as_view()),
]