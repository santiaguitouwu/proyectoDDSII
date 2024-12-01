from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from core.user.api.serializers import UserSerializer

from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate


class LoginSerializer(TokenObtainPairSerializer):
    username_field = "email"  # Define que el campo principal es 'email'

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise AuthenticationFailed("Se requieren el correo electrónico y la contraseña.")

        # Autenticar al usuario
        user = authenticate(request=self.context.get("request"), email=email, password=password)
        if not user:
            raise AuthenticationFailed("Credenciales incorrectas.")

        # Generar los tokens
        data = super().validate(attrs)
        data["user"] = UserSerializer(user).data
        return data