import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MapaComponent } from '../../componentes/mapa/mapa.component';
import { DetalleBicicletaComponent } from '../../componentes/detalle-bicicleta/detalle-bicicleta.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, MapaComponent, DetalleBicicletaComponent]
})
export class HomePageModule {}
