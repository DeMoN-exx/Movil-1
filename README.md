
# AL CLONAR EL REPOSITORIO, PRIMEROS COMANDOS POR CORRER
npm --force i
npm run build o ionic build
npx cap add android # SOLO SI ANDROID FOLDER NO EXISTE
npx cap sync
# BORRAR MIGRACIONES Y PYCACHE DE
ApiProject
core
rest_usuario
rest_viaje

# Django
python manage.py makemigrations core
python manage.py migrate

python manage.py createsuperuser admin/admin


# Django-Admin
Crear usuario con Rol Chofer
Crear usuario con Rol Pasajero

# Lista usuario y viajes
http://127.0.0.1:8000/api/lista_viajes/
http://127.0.0.1:8000/api/usuarios/

# PARA ABRIR ANDROID
npx cap open android
# Dentro de android studio ir a Build y Build APK


Create the Guard 
API |

Create DjangoRest |

Connect DjangoRest w/ MySQL

# Script de creacion

```sql
create database movil CHARSET utf8 COLLATE utf8_spanish_ci;
```


# Instalacion de driver MySQL para windows

```shell
pip install pymysql

```

en el archivo settings.py, agregar la siguiente instruccion arriba:

```python
import pymysql
pymysql.install_as_MySQLdb()
```

pip install django-cors-headers

