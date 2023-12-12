import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { inject } from '@angular/core';
import { Observable, tap, of } from 'rxjs';


interface Usuario {
  username: string;
  password: string;
  correo: string;
  viajeTomado: number;
}

interface RespuestaLogin {
  username: string;
  role: number;
}
interface Viaje {
  patente: string;
  capacidadVehiculo: number;
  vehiculo: string;
  tarifaViaje: number;
  destino: string;
  origen: string;
}
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiURL = 'https://z673ld9f-8000.brs.devtunnels.ms/';
  //private apiURL = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) {
  }

  getUsuarios() {
    return this.http.get(this.apiURL + 'api/lista_usuarios/')
  }

  putUsuarios(username: string, data: any) {
    return this.http.put(this.apiURL + 'api/detalle_usuarios/' + username, data)
  }

  async login(username: string, password: string) {
    console.log('Llamando a la API con username: ', username, ' y password: ', password);
    const body = { username: username, password: password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    try {
      const respuesta = await firstValueFrom(this.http.post<RespuestaLogin>(this.apiURL + 'api/login', body, { headers }));
      console.log('Respuesta de la API: ', respuesta);
      return respuesta;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error; // Puedes manejar el error según tus necesidades
    }
  }
  registrarViaje(data: any): Observable<any> {
    return this.http.post<Viaje>(`${this.apiURL}api/lista_viajes/`, data);
  }
  getViajes(): Observable<any> {
    return this.http.get(this.apiURL + 'api/lista_viajes/')
  }
  tomarViajes(patente : any, data : any): Observable<any> {
    return this.http.put(this.apiURL+'api/detalle_viaje/'+patente+'/', data);
  }

/*
  enviar_correo(data: any): Observable<any> {
    return this.http.post(this.apiURL + 'api/enviar_correo/', data);
  }

  obtener_correo(user: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiURL+'api/detalle_usuarios/'+user);
  }
*/
}