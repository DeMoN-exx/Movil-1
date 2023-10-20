import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject} from '@angular/core';
import { Observable, tap,of} from 'rxjs';
import { usuario } from './models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL ='http://127.0.0.1:8000/api/lista_usuarios/'
  constructor( private http: HttpClient) { }
  
  getUsuarios(): Observable<usuario[]> {
    return this.http.get<usuario[]>('${this.apiURL}').pipe(
      tap(data => console.log(JSON.stringify(data))),
    );
  }
}
