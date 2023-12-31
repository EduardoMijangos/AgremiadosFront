import { AuthGuard } from './auth.guard'; 

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormatosComponent } from './components/formatos/formatos.component';
import { ConveniosComponent } from './components/convenios/convenios.component';
import { ConvocatoriasComponent } from './components/convocatorias/convocatorias.component';
import { FormAgremiadoComponent } from './components/form-agremiado/form-agremiado.component';
import { VeragremiadoComponent } from './components/veragremiado/veragremiado.component';
import { VersolicitudComponent } from './components/versolicitud/versolicitud.component';
import { EnviaravisoComponent } from './components/enviaraviso/enviaraviso.component';
import { EditAgremiadoComponent } from './components/edit-agremiado/edit-agremiado.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path:'components',
    loadChildren: () => import('./components/components.module').then( m => m.ComponentsModule)
  },
  {
    path: 'panelad',
    loadChildren: () => import('./pages/paneladmin/paneladmin.module').then( m => m.PaneladminPageModule)
  },
  {
  path: 'panelagre',
  loadChildren: () => import('./pages/panel-agremiado/panel-agremiado.module').then( m => m.PanelAgremiadoPageModule)
},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'panel',
    redirectTo: 'panel',
    pathMatch: 'full'
  },
  {
    path: 'agremiado',
    redirectTo: 'agremiado',
    pathMatch: 'full'
  },
  {
    path:'formatos',
    component: FormatosComponent
  },
  {
    path: 'convenios',
    component: ConveniosComponent
  },
  {
    path: 'convocatorias',
    component: ConvocatoriasComponent
  },
  {
    path:'formAgremiados',
    component: FormAgremiadoComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'verAgremiado',
    component: VeragremiadoComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'verSolicitud',
    component: VersolicitudComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'enviarAviso',
    component: EnviaravisoComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'editarAgremiado',
    component: EditAgremiadoComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
