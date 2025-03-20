import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaypalComponent } from "../paypal/paypal.component";
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from '../../servicies/auth-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-barra-navegacion',
    standalone: true,
    imports: [RouterLink, PaypalComponent, CommonModule],
    templateUrl: './barra-navegacion.component.html',
    styleUrl: './barra-navegacion.component.css'
})

export class BarraNavegacionComponent {
    nombreUsuario : string = ""
    esPremium: boolean = false;

    constructor(public authService:AuthServiceService, private router: Router){
        this.obtenerNombreUsuario()
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
          this.authService.getPremiumStatus().subscribe({
            next: (esPremium) => {
              this.esPremium = esPremium;
            },
            error: (err) => {
              console.error('Error al obtener el estado premium:', err);
            },
          });
        }
      }

    obtenerNombreUsuario(){
        const token = localStorage.getItem('token')
        if(token) {
            const decodedToken: any = jwtDecode(token)
            this.nombreUsuario = decodedToken.nombreCompleto || 'Usuario'
        } else {
            this.nombreUsuario = 'Invitado'
        }
    }

    cerrarSesion(){
        localStorage.removeItem('token')
        this.router.navigate(['/'])
    }

}
