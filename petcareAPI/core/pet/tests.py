from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import Pet

class MascotaCRUDTests(TestCase):
    # CONFIGURACION INICIAL DEL TEST DEL CRUDL
    def setUp(self):
        self.client = APIClient()
        self.mascota_data = {
            'nombre': 'Firulais',
            'especie': 'Perro',
            'raza': 'Golden Retriever',
            'edad': 1,
            'descripcion': 'Un perro amigable y juguetón',
            'estado_adopcion': True
        }
        self.mascota = Pet.objects.create(**self.mascota_data)
        self.mascota_url = reverse('pet-detail', args=[self.mascota.id])  # URL para el detalle de la mascota api/v1/pet/1

    # TEST DAVID LOPEZ
    def test_crear_mascota(self):
        """Prueba la creación de una nueva mascota"""
        response = self.client.post(reverse('pet-list'), self.mascota_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pet.objects.count(), 2)  # Ahora deberían haber 2 mascotas en la base de datos

    def test_obtener_lista_mascotas(self):
        """Prueba la obtención de la lista de mascotas"""
        response = self.client.get(reverse('pet-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Solo una mascota en la base de datos

    # TEST SANTIAGO JIMENEZ
    def test_actualizar_mascota(self):
        """Prueba la actualización de una mascota existente"""
        nueva_data = {'nombre': 'Rex', 'especie': 'Perro', 'raza': 'Pastor Alemán', 'edad':7,'estado_adopcion':True}
        response = self.client.put(self.mascota_url, nueva_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.mascota.refresh_from_db()  # Actualiza la mascota desde la base de datos
        self.assertEqual(self.mascota.nombre, 'Rex')
        self.assertEqual(self.mascota.raza, 'Pastor Alemán')

    def test_eliminar_mascota(self):
        """Prueba la eliminación de una mascota"""
        response = self.client.delete(self.mascota_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Pet.objects.count(), 0)  # No deberían quedar mascotas en la base de datos

    # TEST LUIS CARABALI 
    def test_validar_mascota_no_adoptada(self):
        """Prueba el estado de adopcion de un animal x"""
        # Primero, actualizamos el estado de adopción de la mascota a False
        self.mascota.estado_adopcion = False
        self.mascota.save()  # Guardamos los cambios en la base de datos
        response = self.client.get(self.mascota_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['estado_adopcion'], False)

    def test_validar_mascota_adoptada(self):
        """Prueba el estado de adopcion de un animal x"""
        # Primero, actualizamos el estado de adopción de la mascota a True
        self.mascota.estado_adopcion = True
        self.mascota.save()  # Guardamos los cambios en la base de datos
        response = self.client.get(self.mascota_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['estado_adopcion'], True)
