from django.urls import path
from rest_viaje.views import viaje_list, detalle_viaje

urlpatterns = [
    path('lista_viajes/', viaje_list),
    path('detalle_viaje/<pk>/', detalle_viaje),
]
