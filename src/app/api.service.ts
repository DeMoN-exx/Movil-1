import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, firstValueFrom} from 'rxjs';
import {inject} from '@angular/core';
import {Observable, tap, of} from 'rxjs';

interface Usuario {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost:8000/api/lista_usuarios/'

  constructor(private http: HttpClient) {
  }

  getUsuarios(): void {
    console.log('Llamando a la API');
    const observable = this.http.get<Usuario[]>(this.apiURL);
    observable.subscribe(lista => {
      console.log(lista);
      console.log(JSON.stringify(lista))
    })
  }

  async login(username: string, password: string) {
    console.log('Llamando a la API con username: ', username, ' y password: ', password);
    const body = {username: username, password: password};
    const respuesta: HttpResponse<any> = await firstValueFrom(this.http.post<any>('http://localhost:8000/api/login', body))
    console.log('Respuesta de la API: ', respuesta);
    return respuesta;
  }
}