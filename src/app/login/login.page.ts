import {Component, OnInit} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide = true
  user = {
    usuario: '',
    password: '',
    correo: ''
  }

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  async ingresar() {
    let usuario = this.user.usuario;
    let password = this.user.password;
    let email = this.user.correo;
    const respuestaLogin = await this.apiService.login(usuario, password,);
    console.log("Respuesta de la base de datos", respuestaLogin)
    if (respuestaLogin) {
      localStorage.setItem('role', String(respuestaLogin.role));
      localStorage.setItem('username', respuestaLogin.username);
      localStorage.setItem('ingresado', 'true');
      localStorage.setItem('email', email);
      this.user.usuario = '';
      this.user.password = '';
      this.router.navigate(['/home'])
    } else {
      localStorage.setItem('ingresado', 'false');
      console.log('Error de usuario o contraseÃ±a')
      this.user.usuario = '';
      this.user.password = '';
    }
  }
}