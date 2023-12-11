from django.db import models

# Create your models here.
class usuario(models.Model):
    username = models.CharField(max_length=30, primary_key=True, unique=True)
    password = models.CharField(max_length=30)
    correo = models.CharField(max_length=30)

    #roles
    ADMIN = 1
    CLIENTE = 2
    CHOFER = 3
    ELEGIR_ROL = (
        (ADMIN, 'Administrador'),
        (CLIENTE, 'Cliente'),
        (CHOFER, 'Chofer'),
    )
    role = models.PositiveSmallIntegerField(choices=ELEGIR_ROL,blank=True,null=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password', 'role']
    def __str__(self):
        return self.username



class viaje(models.Model):
    patente = models.CharField(primary_key=True, unique=True, max_length=6)
    chofer = models.ForeignKey(usuario, to_field='username', on_delete=models.CASCADE, default=1)
    capacidadVehiculo = models.IntegerField()
    vehiculo = models.CharField(max_length=30)
    tarifa = models.IntegerField()
    destino = models.CharField(max_length=30)
    origen = models.CharField(max_length=30)
    def __str__(self):
        return self.patente

