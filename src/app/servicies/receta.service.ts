import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = 'http://localhost:3000/api/receta';
  //private apiUrl = 'https://medicontrolb.onrender.com/api/recetas';
  
  constructor(private http: HttpClient) { }

  registrarReceta(receta: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('x-auth-token', token || ''); 
    return this.http.post(`${this.apiUrl}/save`, receta, { headers });
  }
}
