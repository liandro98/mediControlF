import { Component } from '@angular/core';
import { MedicamentoService } from '../../servicies/medicamento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-estadisticas',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './estadisticas.component.html',
    styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
    estadisticas: any = {};

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void {
    this.medicamentoService.obtenerEstadisticas().subscribe({
      next: (data) => {
        this.estadisticas = data;
      },
      error: (err) => {
        console.error('Error al obtener estadísticas:', err);
      }
    });
  }

}
