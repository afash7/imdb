from django.urls import path
from .views import MovieListView, MovieDetailView

urlpatterns = [
    path('api/movies/', MovieListView.as_view(), name='movie-list-api'),
    path('', MovieListView.as_view(), name='movie-list'),
    path('<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
]
