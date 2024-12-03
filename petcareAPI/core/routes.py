from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.auth.viewsets.login import LoginViewSet
from core.auth.viewsets.refresh import RefreshViewSet
from core.pet.views import PetViewSet
from core.auth.viewsets.register import RegisterViewSet


# Instancia del router
router = DefaultRouter()

# Registro de las rutas para el ProductoViewSet
router.register(r'auth/login', LoginViewSet, basename='login')
router.register(r'auth/refresh', RefreshViewSet, basename='refresh')
router.register(r'pet', PetViewSet)
router.register(r'auth/register', RegisterViewSet, basename='register')
# router.register(r'pet', PetViewSet)

# Configurar las URLs para que incluyan las rutas del router
urlpatterns = [
    path('', include(router.urls)),
    path('api/v1/', include(router.urls)),
]