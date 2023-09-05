import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { IonicModule } from '@ionic/angular';

import { RecuperarPasswordPageRoutingModule } from './recuperar-password-routing.module';

import { RecuperarPasswordPage } from './recuperar-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarPasswordPageRoutingModule,
    MatInputModule,
    MatFormFieldModule

  ],
  declarations: [RecuperarPasswordPage]
})
export class RecuperarPasswordPageModule {}
