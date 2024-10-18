from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from core.user.api.serializers import UserSerializer


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(
            attrs
        )  
        data["user"] = UserSerializer(
            self.user
        ).data  
        return data