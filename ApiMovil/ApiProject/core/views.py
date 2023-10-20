from django.shortcuts import render
from .models import usuario
# Create your views here.
def funcion1 (request):
    usuarios = usuario.objects.all()
    datos = {'usuarios': usuarios}
    return render(request, 'core/funcion1.html')