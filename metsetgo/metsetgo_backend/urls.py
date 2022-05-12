from rest_framework import routers
from .api import GetPlayerView, GetSportsView, GetVenuesView, UpdatePlayerView, PlayerEventsView
from .api import GetEventsView, CreateEventView, UpdateEventView, JoinEventView
from django.urls import path, include

router = routers.DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),

    path('players/<user_id>/', GetPlayerView.as_view(), name='get_players'),
    path('players/<user_id>/edit/', UpdatePlayerView.as_view(), name='players'),
    path('players/<user_id>/events/', PlayerEventsView.as_view(), name='aplayers'),

    path('events/', GetEventsView.as_view(), name='viewEvents'),
    path('events/create', CreateEventView.as_view(), name='createEvent'),
    path('events/<pk>/', GetEventsView.as_view(), name='viewEvents'),
    path('events/<pk>/edit', UpdateEventView.as_view(), name='updateEvent'),
    path('events/join', JoinEventView.as_view(), name='joinEvent'),
  
    path('sports/', GetSportsView.as_view(), name='getSports'),
    path('venues/', GetVenuesView.as_view(), name='getVenues'),

]
