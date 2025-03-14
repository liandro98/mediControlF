import { Component } from '@angular/core';
import { MedicamentoService } from '../../servicies/medicamento.service';
import { CommonModule } from '@angular/common';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';

@Component({
    selector: 'app-medicamentos',
    standalone: true,
    imports: [CommonModule, BarraNavegacionComponent],
    templateUrl: './medicamentos.component.html',
    styleUrl: './medicamentos.component.css'
})
export class MedicamentosComponent {
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

  calcularTomasFaltantes(medicamento: any): number {
    const fechaFin = new Date(medicamento.fechaFin);
    const hoy = new Date();
    const diffTime = Math.abs(fechaFin.getTime() - hoy.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / medicamento.cada);
  }
}
