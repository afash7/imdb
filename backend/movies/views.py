from django.shortcuts import render
from rest_framework import generics
from .models import Movie
from .serializers import MovieSerializer

class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer
