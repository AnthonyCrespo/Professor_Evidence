from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView
from rest_framework import routers 
from user_profile import views

router = routers.DefaultRouter()
router.register(r'UserProfile',views.UserProfile, 'UserProfile')
urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view()),
]