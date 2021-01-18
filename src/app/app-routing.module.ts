import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'formulario-creacion-bicicleta/:number',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./pages/formulario-creacion-bicicleta/formulario-creacion-bicicleta.module').then(m => m.FormularioCreacionBicicletaPageModule)
  },
  {
    path: 'abm-bicicletas',
    loadChildren: () => import('./pages/abm-bicicletas/abm-bicicletas.module').then(m => m.AbmBicicletasPageModule)
  },
  {
    path: 'pedir-bicicleta/:number',
    loadChildren: () => import('./pages/pedir-bicicleta/pedir-bicicleta.module').then( m => m.PedirBicicletaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
