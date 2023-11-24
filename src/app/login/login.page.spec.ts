import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let authService: ApiService;
  let spy:any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule, HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(ApiService);

    
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar "Iniciar sesión" en el HTML', () => {
    fixture.detectChanges();
    const h1Element = fixture.nativeElement.querySelector('h1');
    expect(h1Element).toBeTruthy();
    expect(h1Element.textContent).toContain('Login');
  });

 

  
    
  it('debe establecer loginvacio en verdadero si las credenciales están vacías al entrar', () => {
    component.user.usuario = '';
    component.user.password = '';


    component.ingresar();


  });

  
});