import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://localhost:8000/api';


@Injectable({
  providedIn: 'root'
})
export class AgremiadosService {

  constructor(
    private http: HttpClient
  ) { }
  

  editAgremiado(datos: any, id: number){
    return this.http.put(`${URL}/updateAgremiado/${id}`, datos);
  }

  deleteAgremiado(agremiadoId: number){
    return this.http.delete(`${URL}/deleteAgremiado/${agremiadoId}`);
  }

}
