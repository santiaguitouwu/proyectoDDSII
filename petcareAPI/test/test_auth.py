from django.test import TestCase
from django.contrib.auth import get_user_model

# clase UserTests -> contiene pruebas relacionadas con la creación y autenticación de usuarios.
class UserTests(TestCase):
	# este método setUp se ejecuta antes de cada prueba
    def setUp(self):
        # usuario para pruebas
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass'
        )

	# primera prueba -> el usuario se creo correctamente?
    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'testuser@example.com')
        self.assertTrue(self.user.check_password('testpass'))

	# segunda prueba -> verificar que el usuario puede autenticarse con las credenciales correctas.
    def test_user_authentication(self):
        user = get_user_model().objects.get(username='testuser')
        self.assertTrue(user.check_password('testpass'))
