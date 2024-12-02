from django.db import models

# Create your models here.
class Pet(models.Model):
    nombre = models.CharField(max_length=100)
    especie = models.CharField(max_length=50)
    raza = models.CharField(max_length=50)
    edad = models.IntegerField()
    descripcion = models.TextField(blank=True)
    estado_adopcion = models.BooleanField(default=False)
