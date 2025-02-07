import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../servicies/auth-service.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  usuario: string = '';
  clave: string = '';
  nombreCompleto: string = '';
  correoElec: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthServiceService, private router : Router){}

  registrar() {
    const userData = {
      usuario: this.usuario,
      clave: this.clave,
      nombreCompleto: this.nombreCompleto,
      correoElec: this.correoElec
    };

    this.authService.register(userData).subscribe(
      (response) => {
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirige al login tras éxito
        }, 2000);
      },
      (error) => {
        this.errorMessage = 'Error al registrar. Intenta nuevamente.';
      }
    );
  }

}
