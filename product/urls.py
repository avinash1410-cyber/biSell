from django.urls import path
from product.views import Home,ProductAPIView,ProductSearchAPIView

urlpatterns = [
    path('',Home.as_view(),name='home'),
    path('<int:pk>/',ProductAPIView.as_view()),
    path('search/<str:query>/',ProductSearchAPIView.as_view()),
]