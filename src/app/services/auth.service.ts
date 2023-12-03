import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Url = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getNewAgremiado: EventEmitter<any> = new EventEmitter();
  private loggedIn = false; // Variable para rastrear el estado de autenticación

  constructor(private http: HttpClient) {}

  login(name: string, password: string): Observable<any> {
    const body = { name: name, password: password };
    return this.http.post(`${Url}/newLogin`, body);
  }

  addAgremiado(
    nombre: string, apellido_p: string, apellido_m: string,
    id_genero: number, NUE: string, NUP: string, RFC: string,
    NSS: string, fecha_nacimiento: string, telefono: number,
    cuota: number, id_rol: number
  ): Observable<any> {
    const agremiado = {
      nombre: nombre,
      apellido_p: apellido_p, 
      apellido_m: apellido_m,
      id_genero: id_genero,
      NUE: NUE,
      NUP: NUP,
      RFC: RFC,
      NSS: NSS,
      fecha_nacimiento: fecha_nacimiento,
      telefono: telefono,
      cuota: cuota,
      id_rol: id_rol
    };
    return this.http.post(`${Url}/NewAgremiado`, agremiado);
  }

  getAgremiados(): Observable<any> {
    return this.http.get(`${Url}/getAgremiados`);
  }

  setNewAgremiado(data: any) {
    this.getNewAgremiado.emit(data);
  }

  getGenero(id: number): Observable<any> {
    return this.http.get(`${Url}/getGeneros/`);
  }

  getGeneros(): Observable<any> {
    return this.http.get(`${Url}/getGeneros`);
  }

  getRol(id: number): Observable<any> {
    return this.http.get(`${Url}/getRoles/`);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${Url}/getRoles`);
  }

// En el servicio AuthService
isLoggedIn(): boolean {
  console.log('Estado de autenticación:', this.loggedIn);
  return this.loggedIn;
}


  // Método para actualizar el estado de autenticación
  setLoggedIn(value: boolean): void {
    this.loggedIn = value;
  }

  cerrarSesion(): void {
    console.log('Cerrando sesión...');
    // Resto de la lógica
    this.setLoggedIn(false);
  }
}
