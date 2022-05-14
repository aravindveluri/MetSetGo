from rest_framework import routers
from .api import GetPlayerView, GetSportsView, GetVenuesView, UpdatePlayerView, PlayerEventsView
from .api import GetEventsView, CreateEventView, UpdateEventView, JoinEventView
from django.urls import path, include

router = routers.DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),

    path('players/<user_id>/', GetPlayerView.as_view(), name='get_player'),
    path('players/<user_id>/edit/', UpdatePlayerView.as_view(), name='edit_player'),
    path('players/<user_id>/events/', PlayerEventsView.as_view(), name='player_events'),

    path('events/', GetEventsView.as_view(), name='view_events'),
    path('events/create', CreateEventView.as_view(), name='create_event'),
    path('events/<pk>/', GetEventsView.as_view(), name='view_events'),
    path('events/<pk>/edit', UpdateEventView.as_view(), name='update_event'),
    path('events/join', JoinEventView.as_view(), name='join_event'),
  
    path('sports/', GetSportsView.as_view(), name='get_sports'),
    path('venues/', GetVenuesView.as_view(), name='get_venues'),

]
