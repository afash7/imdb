from django.db import models
from users.models import CustomUser
from movies.models import Movie

class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification to {self.user.email} for {self.movie.title}'
