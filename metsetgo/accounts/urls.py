from django.urls import path, include
from .api import SignUpAPI, SignInAPI, MainUser
from knox import views as knox_views

urlpatterns = [
    path('api/auth/', include('knox.urls'),name='auth'),
    path('api/auth/register', SignUpAPI.as_view(),name="register"),
    path('api/auth/login', SignInAPI.as_view(),name="login"),
    path('api/auth/user', MainUser.as_view(),name="user"),
    path('api/auth/logout',knox_views.LogoutView.as_view(), name="logout"),
]