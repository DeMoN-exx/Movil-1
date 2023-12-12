import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { OnInit } from '@angular/core';
import { AnimationController, IonCard, IonSegment } from '@ionic/angular';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage implements OnInit {
  user: any
  correo: any
  viajes: any
  viajetomado: boolean = false

  PATENTE: any

  destinatario: any;
  asunto: string = 'Confirmacion viaje tellevoapp';
  cuerpo: string = 'Tu viaje ha sido confirmado';
  constructor(private router: Router, private animationCtrl: AnimationController, private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient,) { }

  ngOnInit() {
    this.cargaViaje()
    this.user = localStorage.getItem('username')
    console.log('Usuario: ', this.user);
    this.PATENTE = localStorage.getItem('Patente')
    console.log(this.viajes)
  }

  cargaViaje() {
    this.apiService.getViajes().subscribe(
      (response) => {
        console.log(response);
        this.viajes = response;
      }
      ,
      (error) => {
        console.log(error);
      }
    )
  }


  salir(patente: string) {
    console.log("Patente: ", patente)
    for (const viaje of this.viajes) {
      if (viaje.patente == patente) {
        console.log("Viaje encontrado")
        this.viajetomado = true;
        this.apiService.tomarViajes(viaje.patente, viaje).subscribe(
          response => {
            viaje.capacidadVehiculo += 1;
            this.apiService.tomarViajes(viaje.patente, viaje).subscribe(
              response => {
                console.log('Capacidad actualizada: ',viaje.capacidadVehiculo)
              }
            )
            console.log('Capacidad actualizada con éxito:', response);
            console.log('Capacidad actualizada del viaje: ' + viaje.capacidadVehiculo)
            console.log('Viaje cancelado')
            localStorage.removeItem('Patente');
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }
          ,
          (error) => {
            console.log(error);
          }
        )

      }


    }

  }

  confirmar() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    /*
    this.apiService.obtener_correo(this.user).subscribe(
      (data) => {

        const mail = data.correo;
        console.log(mail); const correo = {
          destinatario: mail,
          asunto: this.asunto,
          cuerpo: this.cuerpo
        }
        this.apiService.enviar_correo(correo).subscribe(
          (response) => {

            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
            console.log(response);
          },
          (error) => {
            console.error('Error al enviar el correo', error);
          }
        );
      }
    )
    */
    });
  }
}
