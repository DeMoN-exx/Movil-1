from django.urls import path
from rest_usuario.views import usuario_list, login

urlpatterns = [
    path('lista_usuarios/', usuario_list),
    path('login', login)
]
