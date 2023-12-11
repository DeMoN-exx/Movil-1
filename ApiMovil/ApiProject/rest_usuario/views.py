from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from core.models import usuario
from .serializers import UsuarioSerializer
# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST',])
def usuario_list(request):
    if request.method == 'GET':
        usuarios = usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET','PUT','DELETE'])
def detalle_usuarios (request,id):
    try:
        user = usuario.objects.get(username=id)
    except usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serilizer = UsuarioSerializer(user)
        return Response(serilizer.data)
    if request.method == 'PUT':
        serilizer = UsuarioSerializer(user,data=request.data)
        if serilizer.is_valid():
            serilizer.save()
            return Response(serilizer.data)
        else:
            return Response(serilizer.errors,status=status.HTTP_404_NOT_FOUND)
    if request.method =='DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 

@csrf_exempt
@api_view(['POST'])
def login(request):
    username_ = request.data['username']
    password_ = request.data['password']
    usuario_existe = usuario.objects.filter(username=username_, password=password_)
    print(list(usuario_existe))
    if len(usuario_existe) == 1:
        usuario_real = usuario_existe[0]
        print(usuario_real)
        serializer = UsuarioSerializer(usuario_real, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    else:
        return Response(data=False, status=status.HTTP_200_OK)
