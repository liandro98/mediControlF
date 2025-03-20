import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:3000/api/auth';
  //private apiUrl = 'https://medicontrolb.onrender.com';

  constructor(private http: HttpClient, private afAuth: AngularFireAuth,  private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Inicio de sesion con google
  async loginWithGoogle() {
    try {
      // Iniciar sesión con Google usando Firebase
      const result = await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      const user = result.user;

      if (user) {
        // Preparar los datos del usuario para enviar al backend
        const userData = {
          uid: user.uid,
          email: user.email,
          nombre: user.displayName,
        };

        // Enviar los datos al backend
        this.http.post(`${this.apiUrl}/google`, userData).subscribe({
          next: (res: any) => {
            console.log('Respuesta del backend:', res);

            // Guardar el token en el localStorage
            if (res.token) {
              localStorage.setItem('token', res.token);
            }

            // Guardar la información del usuario en el localStorage
            if (res.user) {
              localStorage.setItem('user', JSON.stringify(res.user));
            }

            // Redirigir al usuario a la página principal
            this.router.navigate(['/principal']);
          },
          error: (err) => {
            console.error('Error al enviar datos al backend:', err);
          },
        });
      }

      return user;
    } catch (error) {
      console.error('Error en login con Google:', error);
      return null;
    }
  }

  // Método para obtener la información del usuario desde el localStorage
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  // Cerrar sesión
  async logout2() {
    await this.afAuth.signOut();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    return !!token; // Devuelve true si el token existe, false si no
  }

  // Menejo de premium
  activatePremium(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || ''); 
  
    return this.http.post(`${this.apiUrl}/premium`, {}, { headers });
  }

  getPremiumStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || ''); 
  
    return this.http.get<boolean>(`${this.apiUrl}/premium`, { headers });
  }
}
