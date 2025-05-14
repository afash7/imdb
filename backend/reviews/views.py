from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer
from .permissions import IsAuthenticatedOrReadOnly
from notifications.tasks import send_review_notification
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        review = serializer.save(user=self.request.user)
        notify_reviewers.delay(review.movie.id)
        send_review_notification.delay(review.movie.id, self.request.user.id)


class ReviewListView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter] 
    filterset_fields = ['movie'] 
    search_fields = ['comment', 'user__full_name'] 
    ordering_fields = ['created_at', 'rating']
