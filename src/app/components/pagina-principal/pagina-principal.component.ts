import { Component } from '@angular/core';
import { BarraNavegacionComponent } from "../barra-navegacion/barra-navegacion.component";
import { RouterLink } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { MedicamentoService } from '../../servicies/medicamento.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagina-principal',
    standalone: true,
    imports: [BarraNavegacionComponent, RouterLink, MapaComponent, CommonModule],
    templateUrl: './pagina-principal.component.html',
    styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {
    medicamentos: any[] = [];

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void {
    this.obtenerMedicamentos();
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
