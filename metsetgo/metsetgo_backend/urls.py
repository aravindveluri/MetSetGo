from rest_framework import routers
from .api import GetPlayerView, UpdatePlayerView
from django.urls import path, include

router = routers.DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('players/<pk>/', GetPlayerView.as_view(), name='players'),
    path('players/edit/<pk>/', UpdatePlayerView.as_view(), name='players')
]
