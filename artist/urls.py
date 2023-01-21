from django.urls import path
from artist.views import ArtistAPIView,AddDataAPIView,ArtistDesigns

urlpatterns = [
    path('',ArtistAPIView.as_view()),
    path('<int:pk>/',ArtistAPIView.as_view()),
    path('<int:pk>/designs/',ArtistDesigns.as_view()),
    path('addData/',AddDataAPIView.as_view()),
    path('Mydesigns/',ArtistDesigns.as_view()),
]