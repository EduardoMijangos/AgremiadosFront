import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelAgremiadoPage } from './panel-agremiado.page';

const routes: Routes = [
  {
    path: '',
    component: PanelAgremiadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelAgremiadoPageRoutingModule {}
