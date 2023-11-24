from rest_framework import serializers
from core.models import viaje

class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = viaje
        fields = 'idViaje','chofer','capacidadVehiculo','vehiculo','tarifa','destino','origen'