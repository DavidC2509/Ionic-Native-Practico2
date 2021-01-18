import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioCreacionBicicletaPage } from './formulario-creacion-bicicleta.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioCreacionBicicletaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioCreacionBicicletaPageRoutingModule {}
