import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbmBicicletasPageRoutingModule } from './abm-bicicletas-routing.module';

import { AbmBicicletasPage } from './abm-bicicletas.page';
import { ListaBicicletaAdministracionComponent } from '../../componentes/lista-bicicleta-administracion/lista-bicicleta-administracion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbmBicicletasPageRoutingModule
  ],
  declarations: [AbmBicicletasPage, ListaBicicletaAdministracionComponent]
})
export class AbmBicicletasPageModule {}
