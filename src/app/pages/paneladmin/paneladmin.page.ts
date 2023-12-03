import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.page.html',
  styleUrls: ['./paneladmin.page.scss'],
})
export class PaneladminPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  formAgremiado(){
    this.router.navigate(['/formAgremiados']);
  }

  verAgremiado(){
    this.router.navigate(['/verAgremiado']);
  }

  verSolicitud(){
    this.router.navigate(['/verSolicitud']);
  }

  enviarAviso(){
    this.router.navigate(['/enviarAviso']);
  }

  cerrarSesion() {
    // Llama al método de tu servicio AuthService para cerrar sesión y actualiza el estado de autenticación
    this.authService.cerrarSesion();
    // Redirige a la página de inicio de sesión u otra página de tu elección
    this.router.navigate(['/home']);
  }

}
