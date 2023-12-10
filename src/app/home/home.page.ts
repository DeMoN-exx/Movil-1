import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { OnInit, QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard, IonSegment } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  state: any;
  user: any;
  role: any;
  capacidadVehiculo: number | undefined;
  patente: string | undefined;
  vehiculo: string | undefined;
  tarifa: number | undefined;
  destino: string | undefined;
  origen: string | undefined;
  viajes: any = [];
  viajetomado: boolean = false;

  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonCardElement>;
  @ViewChild(IonSegment)
  segment!: IonSegment;

  private animation!: Animation;
  public selectedSegment!: string
  ApiService: any;
  constructor(private activeroute: ActivatedRoute, private router: Router, private animationCtrl: AnimationController, private apiService: ApiService) {
  }
  salir() {
    localStorage.removeItem('ingresado');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    //this.segment.value = 'Inicio';
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.user = localStorage.getItem('username')
    this.role = localStorage.getItem('role')
    console.log('Usuario: ', this.user);
    this.CargaViaje()
  }
  segmentChanged(event: any) {
    console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }
  registrarViaje() {
    if (!this.capacidadVehiculo || !this.vehiculo || !this.tarifa || !this.destino || !this.origen) {
      console.log('Por favor complete todos los campos.');
      return;
    }

    const data = {
      chofer: this.user,
      patente: this.patente,
      capacidadVehiculo: this.capacidadVehiculo,
      vehiculo: this.vehiculo,
      tarifa: this.tarifa,
      destino: this.destino,
      origen: this.origen,
    };

    this.apiService.registrarViaje(data).subscribe(
      (response) => {
        this.user = '';
        this.patente = '';
        this.capacidadVehiculo = 0;
        this.vehiculo = '';
        this.tarifa = 0;
        this.destino = '';
        this.origen = '';
        console.log('Registro de viaje exitoso:', response);
      },
      (error) => {
        console.error('Error al registrar el viaje:', error, data);
      }
    );
  }
  CargaViaje() {
    this.apiService.getViajes().subscribe(
      (response) => {
        this.viajes = response;
        console.log('Viajes cargados');
      }
      ,
      (error) => {
        console.log(error);
      }
    )
  }
  async geolocalizar() {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);
  }

  tomarViajes(patente: string) {
    for (const viaje of this.viajes) {
      if (viaje.patente == patente) {
        console.log("Viaje encontrado")
        viaje.capacidadVehiculo -= 1;
        this.viajetomado = true;
        this.apiService.tomarViajes(viaje.patente, viaje).subscribe(
          response => {
            console.log('Capacidad actualizada con éxito:', response);
            console.log('Capacidad actualizada del viaje: ' + viaje.capacidadVehiculo)
          }
          ,
          (error) => {
            console.log(error);
          }
        )

      }


    }

  }
}
