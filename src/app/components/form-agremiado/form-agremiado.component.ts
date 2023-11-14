import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-agremiado',
  templateUrl: './form-agremiado.component.html',
  styleUrls: ['./form-agremiado.component.scss'],
})
export class FormAgremiadoComponent  implements OnInit {
  agregiadoForm: FormGroup

  constructor(
    private fb: FormBuilder
  ) { 

    this.agregiadoForm = this.fb.group({
      apellidoPaterno:[],
      apellidoMaterno:[],
      nombre:[],
      nup:[],
      nue:[],
      rfc:[],
      nss:[],
      fecha:[],
      telefono:[],
      cuota:[],
      genero:[]
    })
  }

  ngOnInit() {}

  submit(){}
}
