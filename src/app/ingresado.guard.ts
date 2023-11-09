import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Ingresado Guard Inicio")
    if(localStorage.getItem('ingresado')){
      console.log("Ingresado Guard Ingresado")
      return true;
    }else{
      console.log("Ingresado Guard No Ingresado")
      //console.log(this.navCtrl)
      this.router.navigate(['login'])
      return false;
    }
      
    
  }
  
}
