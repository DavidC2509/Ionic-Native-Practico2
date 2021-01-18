import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioCreacionBicicletaPageRoutingModule } from './formulario-creacion-bicicleta-routing.module';

import { FormularioCreacionBicicletaPage } from './formulario-creacion-bicicleta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioCreacionBicicletaPageRoutingModule
  ],
  declarations: [FormularioCreacionBicicletaPage]
})
export class FormularioCreacionBicicletaPageModule {}
