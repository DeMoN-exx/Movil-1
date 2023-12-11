from django.urls import path
from rest_usuario.views import usuario_list, login, detalle_usuarios
urlpatterns = [
    path('lista_usuarios/', usuario_list),
    path('login', login),
    path('detalle_usuarios/<id>', detalle_usuarios, name="detalle_usuarios"),
]
