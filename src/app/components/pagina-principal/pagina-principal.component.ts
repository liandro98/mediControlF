import { Component } from '@angular/core';
import { BarraNavegacionComponent } from "../barra-navegacion/barra-navegacion.component";
import { RouterLink } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { MedicamentoService } from '../../servicies/medicamento.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../servicies/auth-service.service';


@Component({
    selector: 'app-pagina-principal',
    standalone: true,
    imports: [BarraNavegacionComponent, RouterLink, MapaComponent, CommonModule],
    templateUrl: './pagina-principal.component.html',
    styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {
    medicamentos: any[] = [];
    esPremium: boolean = false;

  constructor(private medicamentoService: MedicamentoService, public authService:AuthServiceService) {}

  ngOnInit(): void {
    this.obtenerMedicamentos();
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

  obtenerMedicamentos() {
    this.medicamentoService.obtenerMedicamentos().subscribe({
      next: (data) => {
        this.medicamentos = data;
      },
      error: (error) => {
        console.error('Error al obtener medicamentos:', error);
      },
    });
  }
}
