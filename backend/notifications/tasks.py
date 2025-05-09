from django.core.mail import send_mail
from reviews.models import Review
from users.models import CustomUser
from movies.models import Movie
from .models import Notification

def send_review_notification(movie_id, sender_user_id):
    movie = Movie.objects.get(id=movie_id)
    reviewers = Review.objects.filter(movie=movie).exclude(user__id=sender_user_id).select_related('user')

    for review in reviewers:
        user = review.user
        if not Notification.objects.filter(user=user, movie=movie).exists():
            send_mail(
                subject=f'نقد جدید روی {movie.title}',
                message=f'کاربر جدیدی یک نقد جدید روی فیلم "{movie.title}" نوشته.',
                from_email='noreply@imdbclone.com',
                recipient_list=[user.email],
                fail_silently=False,
            )
            Notification.objects.create(user=user, movie=movie)
