from django.urls import path, include
from .views import ReviewCreateView, ReviewListView 

urlpatterns = [
    path('create/', ReviewCreateView.as_view(), name='review-create'),
    path('', ReviewListView.as_view(), name='review-list'),
]
