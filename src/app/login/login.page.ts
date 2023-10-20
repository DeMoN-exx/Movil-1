import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide = true
  user ={
    usuario:'',
    password:''
  }
  constructor(private router: Router , private apiService: ApiService) { }
  ngOnInit(): void {
  }
 ingresar() {
    localStorage.setItem('ingresado','true');
    let navegationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    }
    this.router.navigate(['/home'], navegationExtras)
  }

}

