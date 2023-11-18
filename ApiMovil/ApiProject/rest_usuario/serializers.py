from rest_framework import serializers
from core.models import usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuario
        fields = 'username','role'