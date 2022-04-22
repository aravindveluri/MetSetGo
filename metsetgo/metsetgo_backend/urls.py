from rest_framework import routers
from .api import PlayerViewSet

router = routers.DefaultRouter()
router.register('api/players', PlayerViewSet, 'players')

urlpatterns = router.urls