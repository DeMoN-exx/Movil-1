import json
from django.http import JsonResponse
from django.shortcuts import render
from .models import usuario
from .models import viaje
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from core.models import usuario

# Create your views here.
def funcion1 (request):
    usuarios = usuario.objects.all()
    datos = {'usuarios': usuarios}
    return render(request, 'core/funcion1.html')
def funcion2 (request):
    viajes = viaje.objects.all()
    datos = {'viajes': viajes}
    return render(request, 'core/funcion2.html')


'''
@api_view(['POST'])
@csrf_exempt
def enviar_correo(request):
    if request.content_type == 'application/json':
        data = json.loads(request.body)
        destinatario = data.get('destinatario')
        asunto = data.get('asunto')
        cuerpo = data.get('cuerpo')
    elif request.content_type == 'multipart/form-data':
        destinatario = request.POST.get('destinatario')
        asunto = request.POST.get('asunto')
        cuerpo = request.POST.get('cuerpo')
    else:
        return JsonResponse({'error': 'Formato de solicitud no soportado'}, status=400)

    try:
        send_mail(
            asunto,
            cuerpo,
            'mandarmail01@gmail.com',
            [destinatario],
            fail_silently=False,
        )
        return JsonResponse({'mensaje': 'Correo enviado con éxito'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
'''