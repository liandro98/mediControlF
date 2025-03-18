import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private apiUrl = 'http://localhost:3000/api/medicamento';
  //private apiUrl = 'https://medicontrolb.onrender.com/api/medicamentos';

  constructor(private http: HttpClient) { }

  obtenerMedicamentos(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || ''); 
    console.log(headers)
    return this.http.get(`${this.apiUrl}/consulta`, { headers });
  }
}
