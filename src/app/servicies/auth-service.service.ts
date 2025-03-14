import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:3000';

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
      const result = await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      const user = result.user;

      if (user) {
        // Enviar la información del usuario al backend
        const userData = {
          uid: user.uid,
          email: user.email,
          nombre: user.displayName
        };

        this.http.post(`${this.apiUrl}/api/auth/google`, userData).subscribe({
          next: (res: any) => {
            console.log('Usuario autenticado y guardado en el backend:', res);

            // Guardar la información del usuario en el localStorage
            localStorage.setItem('user', JSON.stringify(res.user));

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
}
