from rest_framework import serializers
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ("email", "full_name", "password")

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

