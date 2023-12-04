import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConveniosComponent } from './convenios/convenios.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { FormatosComponent } from './formatos/formatos.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAgremiadoComponent } from './form-agremiado/form-agremiado.component';
import { VeragremiadoComponent } from './veragremiado/veragremiado.component';
import { VersolicitudComponent } from './versolicitud/versolicitud.component';
import { EnviaravisoComponent } from './enviaraviso/enviaraviso.component';
import { EditAgremiadoComponent } from './edit-agremiado/edit-agremiado.component';



@NgModule({
  declarations: [
    ConveniosComponent,
    ConvocatoriasComponent,
    FormatosComponent,
    FormAgremiadoComponent,
    VeragremiadoComponent,
    VersolicitudComponent,
    EnviaravisoComponent,
    EditAgremiadoComponent
  ],
  imports: [    
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ConveniosComponent,
    ConvocatoriasComponent,
    FormatosComponent,
    FormAgremiadoComponent,
    VeragremiadoComponent,
    VersolicitudComponent,
    EnviaravisoComponent,
    EditAgremiadoComponent
  ]
})
export class ComponentsModule { }
