from django.shortcuts import render
from .models import usuario
from .models import viaje
# Create your views here.
def funcion1 (request):
    usuarios = usuario.objects.all()
    datos = {'usuarios': usuarios}
    return render(request, 'core/funcion1.html')
def funcion2 (request):
    viajes = viaje.objects.all()
    datos = {'viajes': viajes}
    return render(request, 'core/funcion2.html')