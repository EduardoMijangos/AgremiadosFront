import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelAgremiadoPageRoutingModule } from './panel-agremiado-routing.module';

import { PanelAgremiadoPage } from './panel-agremiado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelAgremiadoPageRoutingModule
  ],
  declarations: [PanelAgremiadoPage]
})
export class PanelAgremiadoPageModule {}
