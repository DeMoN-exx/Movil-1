import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard, IonSegment } from '@ionic/angular';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  state: any;
  user: any;
  role: any;
  capacidadVehiculo: number | undefined;
  vehiculo: string | undefined;
  tarifaViaje: number | undefined;
  destino: string | undefined;
  origen: string | undefined;

  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonCardElement>;
  @ViewChild(IonSegment)
  segment!: IonSegment;

  private animation!: Animation;
  public selectedSegment!: string
  ApiService: any;
  constructor(private activeroute: ActivatedRoute, private router: Router, private animationCtrl: AnimationController,private apiService: ApiService) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.user = localStorage.getItem('username')
    this.role = localStorage.getItem('role')
    console.log(this.user);
  }
  salir() {
    localStorage.removeItem('ingresado');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
  ngoninit() {
    this.segment.value = 'Inicio';
  }
  segmentChanged(event: any) {
    console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }
  registrarViaje() {
    if (!this.capacidadVehiculo || !this.vehiculo || !this.tarifaViaje || !this.destino || !this.origen) {
      console.log('Por favor complete todos los campos.');
      return;
    }

    const data = {
      usuario: this.user,
      capacidadVehiculo: this.capacidadVehiculo,
      vehiculo: this.vehiculo,
      tarifaViaje: this.tarifaViaje,
      destino: this.destino,
      origen: this.origen,
    };

    this.apiService.registrarViaje(data).subscribe(
      (response) => {
        console.log('Registro de viaje exitoso:', response);
      },
      (error) => {
        console.error('Error al registrar el viaje:', error);
      }
    );
  }
}
