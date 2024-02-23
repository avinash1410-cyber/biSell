from django.urls import path
from .views import OrderAPIView,AddDataAPIView,OrderAPIAdminView,DeleteDataAPIView

urlpatterns = [
    path('',OrderAPIView.as_view()),
    path('<int:pk>/',OrderAPIView.as_view()),
    path('addData/<int:pk>/',AddDataAPIView.as_view()),
    path('deleteData/<int:pk>/',DeleteDataAPIView.as_view()),
    path('admin/',OrderAPIAdminView.as_view()),
]