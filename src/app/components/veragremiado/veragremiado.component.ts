import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-veragremiado',
  templateUrl: './veragremiado.component.html',
  styleUrls: ['./veragremiado.component.scss'],
})
export class VeragremiadoComponent implements OnInit {
  agremiados: any[] = [];
  generos: any;
  roles: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.obtenerAgremiados();
    // Supongamos que el id del género que deseas obtener es 1. 
    // Debes ajustar esto según tus necesidades.
    const idGenero = 1;
    this.obtenerGenero(idGenero);

    const idRol =1;
    this.obtenerRol(idRol);
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
}
