from django.urls import path
from rest_usuario.views import usuario_list

urlpatterns = [
    path('lista_usuarios/', usuario_list)
]