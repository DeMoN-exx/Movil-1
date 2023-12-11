import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { inject } from '@angular/core';
import { Observable, tap, of } from 'rxjs';


interface Usuario {
  username: string;
  password: string;
  correo: string;
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
  //private apiURL = 'https://z673ld9f-8000.brs.devtunnels.ms/';
  private apiURL = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) {
  }

  getUsuarios(): void {
    console.log('Recuperando usuarios');
    const observable = this.http.get<Usuario[]>(this.apiURL + 'api/lista_usuarios/');
    observable.subscribe(lista => {
      console.log(lista);
      console.log(JSON.stringify(lista))
    })
  }

  async login(username: string, password: string) {
    console.log('Llamando a la API con username: ', username, ' y password: ', password);
    const body = { username: username, password: password };
    const respuesta = await firstValueFrom(this.http.post<RespuestaLogin>(this.apiURL + 'api/login', body))
    console.log('Respuesta de la API: ', respuesta);
    return respuesta;
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
  enviar_correo(data: any): Observable<any> {
    return this.http.post(this.apiURL + 'api/enviar_correo/', data);
  }

  obtener_correo(user: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiURL+'api/detalle_usuarios/'+user);
  }
}