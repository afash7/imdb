from django.shortcuts import render
from rest_framework import generics, status
from .models import CustomUser
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # اجازه دسترسی به این View برای همه کاربران (احراز هویت نشده)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # شما می‌توانید داده‌های پاسخ را در اینجا سفارشی کنید. برای مثال:
        response_data = {
            "message": "کاربر با موفقیت ثبت‌نام کرد",
            "user_id": user.id,
            "username": user.username,
            "email": user.email
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    View سفارشی برای TokenObtainPairView که جزئیات کاربر را در پاسخ قرار می‌دهد.
    """
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
        user = serializer.user
        token_data = serializer.validated_data
        return Response({
            'access': token_data['access'],
            'refresh': token_data['refresh'],
            'user_id': user.id,  # افزودن ID کاربر
            'username': user.username,
            'email': user.email
        })

@api_view(['GET'])  # View نمونه
def get_user_data(request):
    """
    View نمونه برای نشان دادن نحوه دریافت اطلاعات کاربر از یک endpoint محافظت شده.
    به یک access token معتبر در هدرهای درخواست نیاز دارد.
    """
    user = request.user  # شیء کاربر به درخواست متصل شده است
    return Response({
        'user_id': user.id,
        'username': user.username,
        'email': user.email
    })