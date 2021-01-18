import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirBicicletaPage } from './pedir-bicicleta.page';

const routes: Routes = [
  {
    path: '',
    component: PedirBicicletaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirBicicletaPageRoutingModule {}
