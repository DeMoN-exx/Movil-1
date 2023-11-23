from django.urls import path
from rest_viaje.views import viaje_list

urlpatterns = [
    path('lista_viajes/', viaje_list),
]
