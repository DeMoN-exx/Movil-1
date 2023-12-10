from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from core.models import viaje
from .serializers import ViajeSerializer
# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST'])
def viaje_list(request):
    if request.method == 'GET':
        viajes = viaje.objects.all()
        serializer = ViajeSerializer(viajes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ViajeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def detalle_viaje (request,pk):
    try:
        Viaje = viaje.objects.get(patente=pk)
    except viaje.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serilizer = ViajeSerializer(Viaje)
        return Response(serilizer.data)
    if request.method == 'PUT':
        serilizer = ViajeSerializer(Viaje,data=request.data)
        if serilizer.is_valid():
            serilizer.save()
            return Response(serilizer.data)
        else:
            return Response(serilizer.errors,status=status.HTTP_404_NOT_FOUND)
    if request.method =='DELETE':
        viaje.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

