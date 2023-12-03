import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-agremiado',
  templateUrl: './form-agremiado.component.html',
  styleUrls: ['./form-agremiado.component.scss'],
})
export class FormAgremiadoComponent implements OnInit {
  agregiadoForm: FormGroup;
  generos: any[] = []; 
  roles:any[]=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertsService
  ) {
    this.agregiadoForm = this.fb.group({
      apellido_p: ['', Validators.required],
      apellido_m: ['', Validators.required],
      nombre: ['', Validators.required],
      NUP: ['', Validators.required],
      NUE: ['', Validators.required],
      RFC: ['', Validators.required],
      NSS: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: [, Validators.required],
      cuota: [, Validators.required],
      id_genero: [, Validators.required],
      id_rol: [, Validators.required],
    });
  }

  ngOnInit() {
    this.authService.getGeneros().subscribe(
      (response) => {
        // Asegúrate de adaptar esto según la estructura real de la respuesta
        this.generos = response; // Aquí cambiamos de response.generos a response
      },
      (error) => {
        console.error('Error al obtener la lista de géneros', error);
      }
    );

    this.authService.getRoles().subscribe(
      (response) => {
        // Asegúrate de adaptar esto según la estructura real de la respuesta
        this.roles = response; // Aquí cambiamos de response.generos a response
      },
      (error) => {
        console.error('Error al obtener la lista de roles', error);
      }
    );
  } 
  

  backPanel() {
    this.router.navigate(['/panelad']);
  }

  agregarAgremiado() {
    const {
      apellido_p,
      apellido_m,
      nombre,
      NUP,
      NUE,
      RFC,
      NSS,
      fecha_nacimiento,
      telefono,
      cuota,
      id_genero,
      id_rol
    } = this.agregiadoForm.value;

    this.authService
      .addAgremiado(
        nombre,
        apellido_p,
        apellido_m,
        id_genero,
        NUE,
        NUP,
        RFC,
        NSS,
        fecha_nacimiento,
        telefono,
        cuota,
        id_rol
      )
      .subscribe(
        (respuesta) => {
          console.log('Agremiado agregado exitosamente', respuesta);
          if (respuesta) {
            this.authService.setNewAgremiado(respuesta);
            this.alertService.generateToast({
              duration: 800,
              color: 'success',
              icon: 'checkmark',
              message: 'Agremiad@ cread@',
              position: 'top',
            });
            this.router.navigate(['/verAgremiado']);
          }
        },
        (error) => {
          console.error('Error al agregar agremiado', error);
        }
      );
  }

  submit() {}
}
