from rest_framework import routers
from .api import GetPlayerView,UpdatePlayerView, PlayerEventsView, GetEventsView, CreateEventView, UpdateEventView
from django.urls import path, include

router = routers.DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),

    path('players/<pk>/', GetPlayerView.as_view(), name='get_players'),
    path('players/<pk>/edit/', UpdatePlayerView.as_view(), name='players'),
    path('players/<pk>/events/', PlayerEventsView.as_view(), name='aplayers'),

    path('events/', GetEventsView.as_view(), name='viewEvents'),
    path('events/create/', CreateEventView.as_view(), name='createEvent'),
    path('events/<pk>/', GetEventsView.as_view(), name='viewEvents'),
    path('events/<pk>/edit/', UpdateEventView.as_view(), name='updateEvent'),

]
