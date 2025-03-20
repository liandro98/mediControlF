import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../servicies/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  usuario: string = '';
  clave: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router){}

  login() {
    const credentials = {
      usuario: this.usuario,
      clave: this.clave
    };
  
    this.authService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/principal']);
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    );
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      console.error('Error en el login con Google:', error);
    }
  }
}
