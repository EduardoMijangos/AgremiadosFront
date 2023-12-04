import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AgremiadosService } from 'src/app/services/agremiados.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-agremiado',
  templateUrl: './edit-agremiado.component.html',
  styleUrls: ['./edit-agremiado.component.scss'],
})
export class EditAgremiadoComponent implements OnInit {
  @Input() agremiadoData: any; // Recibimos el objeto agremiadoData como entrada
  agremiados: any[] = [];
  generos: any;
  roles: any;

  agregiadoForm: FormGroup;

  constructor(
    private agremiadoService: AgremiadosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertsService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {
    this.agregiadoForm = this.formBuilder.group({
      // Aquí debes definir los campos del formulario
      apellido_p: ['', Validators.required],
      apellido_m: ['', Validators.required],
      nombre: ['', Validators.required],
      NUP: ['', Validators.required],
      NUE: ['', Validators.required],
      RFC: ['', Validators.required],
      NSS: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      cuota: ['', Validators.required],
      id_genero: ['', Validators.required],
      id_rol: ['', Validators.required],
      // ... Puedes agregar más campos según sea necesario
    });
  }

  ngOnInit() {
    if (this.agremiadoData) {
      // Rellenar el formulario con la información del agremiadoData
      this.agregiadoForm.patchValue(this.agremiadoData);
    }
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

  actualizarAgremiado() {
    if (this.agregiadoForm.valid) {
      // Obtener el ID del agremiado (reemplaza con la lógica adecuada)
      const idAgremiado = this.agremiadoData.id; // Asumiendo que hay una propiedad 'id' en agremiadoData

      // Llamar al servicio para actualizar el agremiado
      this.agremiadoService.editAgremiado(this.agregiadoForm.value, idAgremiado).subscribe(
        (response) => {
          console.log('Agremiado actualizado correctamente', response);
          this.alertService.generateToast({
            duration: 800,
              color: 'success',
              icon: 'checkmark',
              message: 'Agremiad@ Actualiz@',
              position: 'top',
          });
          this.router.navigate(['/verAgremiado']);
          // Puedes emitir algún evento o devolver datos al componente que llamó al modal
          // por ejemplo, this.modalCtrl.dismiss(response);
        },
        (error) => {
          console.error('Error al actualizar agremiado', error);
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
;
  }

  // ... Puedes agregar más métodos según sea necesario

