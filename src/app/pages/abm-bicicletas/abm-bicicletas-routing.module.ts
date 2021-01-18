import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbmBicicletasPage } from './abm-bicicletas.page';

const routes: Routes = [
  {
    path: '',
    component: AbmBicicletasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbmBicicletasPageRoutingModule {}
