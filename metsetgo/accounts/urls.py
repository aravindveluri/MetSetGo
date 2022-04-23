from django.urls import path, include
from .api import SignUpAPI, SignInAPI, MainUser
from knox import views as knox_views

urlpatterns = [
    path('api/auth/', include('knox.urls'),name='knox-auth'),
    path('api/auth/register', SignUpAPI.as_view(),name="knox-register"),
    path('api/auth/login', SignInAPI.as_view(),name="knox-login"),
    path('api/auth/user', MainUser.as_view(),name="knox-user"),
    path('api/auth/logout',knox_views.LogoutView.as_view(), name="knox-logout"),
]