import { Component,ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard, IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  state:any;
  user:any;

  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonCardElement>;
  @ViewChild(IonSegment) 
  segment!:IonSegment;

  private animation!: Animation;
  public selectedSegment!: string
  constructor(private activeroute: ActivatedRoute, private router: Router, private animationCtrl: AnimationController,) {
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user = localStorage.getItem('username')
      console.log(this.user);
    })
  }
  ngAfterViewInit() {
    const animation = this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
    animation.play();

  }
  salir(){
    localStorage.removeItem('ingresado');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
  ngoninit(){
    this.segment.value = 'Inicio';
  }
  segmentChanged( event: any )  {
    console.log (event.target.value);
    this.selectedSegment = event.target.value;
  } 
}
