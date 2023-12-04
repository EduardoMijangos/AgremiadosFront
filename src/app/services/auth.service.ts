import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

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
    return this.http.post(`${Url}/newLogin`, body).pipe(
      map((response: any) => {
        const user = response?.user;
        if (user && user.id_rol !== undefined && user.id_rol !== null) {
          const userType = user.id_rol;
          this.setLoggedIn(true);
          this.setLoggedInUserType(userType);
          return { userType, ...response };
        } else {
          console.error('No se pudo obtener el tipo de usuario desde la respuesta del servidor.');
          return null;
        }
      }),
      catchError((error) => {
        console.error('Error en la llamada de inicio de sesión', error);
        return of(null);
      })
    );
  }

  // Método para almacenar el tipo de usuario
  private setLoggedInUserType(userType: number): void {
    // Almacena el tipo de usuario en algún lugar (puedes usar localStorage, por ejemplo)
    // También podrías emitir un evento o usar otro enfoque según tus necesidades
    // En este ejemplo, simplemente almacenaremos el tipo de usuario en localStorage
    localStorage.setItem('userType', userType.toString());
  }

  // Método para obtener el tipo de usuario
  getUserType(): number | null {
    // Obtén el tipo de usuario desde donde lo hayas almacenado
    const userType = localStorage.getItem('userType');
    return userType ? +userType : null; // Convierte a número si existe, de lo contrario, devuelve null
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
