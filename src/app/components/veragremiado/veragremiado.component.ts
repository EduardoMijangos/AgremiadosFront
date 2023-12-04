import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AgremiadosService } from 'src/app/services/agremiados.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormAgremiadoComponent } from '../form-agremiado/form-agremiado.component';
import { EditAgremiadoComponent } from '../edit-agremiado/edit-agremiado.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veragremiado',
  templateUrl: './veragremiado.component.html',
  styleUrls: ['./veragremiado.component.scss'],
})
export class VeragremiadoComponent implements OnInit {
  agremiados: any[] = [];
  generos: any;
  roles: any;

  constructor(
    private authService: AuthService,
    private alertService: AlertsService,
    private agremiadoService: AgremiadosService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router,
    private cdr: ChangeDetectorRef

    ) {}

  ngOnInit() {
    this.obtenerAgremiados();
    // Supongamos que el id del género que deseas obtener es 1. 
    // Debes ajustar esto según tus necesidades.
    const idGenero = 1;
    this.obtenerGenero(idGenero);

    const idRol =1;
    this.obtenerRol(idRol);
    
    this.authService.getNewAgremiado.subscribe((data: any) => {
      // Manejar la emisión del evento aquí, por ejemplo, actualizar la lista de agremiados
      console.log('Evento recibido:', data);
      this.obtenerAgremiados(); // Asegúrate de tener la lógica adecuada para cargar nuevamente los agremiados
    });
  }

  obtenerAgremiados() {
    this.authService.getAgremiados().subscribe(
      (data) => {
        this.agremiados = data;
        console.log('Agremiados obtenidos con éxito', this.agremiados);
      },
      (error) => {
        console.error('Error al obtener agremiados', error);
      }
    );
  }

  obtenerGenero(id: number) {
    this.authService.getGenero(id).subscribe(
      (data) => {
        this.generos = data;
        console.log('Género obtenido con éxito', this.generos);
      },
      (error) => {
        console.error('Error al obtener género', error);
      }
    );
  }

  obtenerRol(id: number) {
    this.authService.getRol(id).subscribe(
      (data) => {
        this.roles = data;
        console.log('Roles obtenidos con éxito', this.roles);
      },
      (error) => {
        console.error('Error al obtener roles', error);
      }
    );
  }

  async eliminarAgremiado(agremiadoId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      mode: 'ios',
      message: '¿Seguro que deseas eliminar este agremiad@?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sí',
          handler: async () => {
            try {
              // Eliminar el agremiado del array local antes de hacer la solicitud HTTP
              this.agremiados = this.agremiados.filter(agremiado => agremiado.id !== agremiadoId);
  
              // Realizar la solicitud HTTP para eliminar el agremiado
              const response = await this.agremiadoService.deleteAgremiado(agremiadoId).toPromise();
  
              // Manejar la respuesta exitosa aquí, si es necesario
              console.log('Agremiad@ eliminado con éxito', response);
              this.alertService.generateToast({
                duration: 800,
                color: 'danger',
                icon: 'trash-outline',
                message: 'Agremiad@ eliminado con éxito',
                position: 'top',
              });
            } catch (error) {
              // Revertir la eliminación del array local si hay un error en la solicitud HTTP  
              // Manejar errores aquí, si es necesario
              console.error('Error al eliminar el agremiado', error);
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async editarAgremiado(agremiado: any) {
    const modal = await this.modalCtrl.create({
      component: EditAgremiadoComponent,
      mode: 'ios',
      componentProps: {
        agremiadoData: agremiado,
      },
    });
    await this.obtenerAgremiados();
  
    await modal.present();
  }
  

}
