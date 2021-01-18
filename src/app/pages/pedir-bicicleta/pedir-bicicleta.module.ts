import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirBicicletaPageRoutingModule } from './pedir-bicicleta-routing.module';

import { PedirBicicletaPage } from './pedir-bicicleta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirBicicletaPageRoutingModule
  ],
  declarations: [PedirBicicletaPage]
})
export class PedirBicicletaPageModule {}
