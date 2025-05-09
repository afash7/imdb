from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer
from .permissions import IsAuthenticatedOrReadOnly
from notifications.tasks import notify_reviewers

class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        review = serializer.save(user=self.request.user)
        notify_reviewers.delay(review.movie.id)
