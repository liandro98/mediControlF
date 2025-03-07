import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';
import { RecetaService } from '../../servicies/receta.service';

@Component({
    selector: 'app-form-receta',
    standalone: true,
    imports: [FormsModule, CommonModule, BarraNavegacionComponent],
    templateUrl: './form-receta.component.html',
    styleUrl: './form-receta.component.css'
})
export class FormRecetaComponent {
  medicamentos: { nombre: string; dosis: string; cada: number; fechaInicio: string; fechaFin: string }[] = [];

  nuevoMedicamento = {
    nombre: '',
    dosis: '',
    cada: 0,
    fechaInicio: '',
    fechaFin: ''
  };

  constructor(private recetaService: RecetaService) {}

  agregarMedicamento() {
    if (this.nuevoMedicamento.nombre && this.nuevoMedicamento.dosis && this.nuevoMedicamento.cada > 0) {
      this.medicamentos.push({ ...this.nuevoMedicamento });
      this.nuevoMedicamento = { nombre: '', dosis: '', cada: 0, fechaInicio: '', fechaFin: '' };
      let modal = document.getElementById('modalMedicamento') as any;
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  eliminarMedicamento(index: number) {
    this.medicamentos.splice(index, 1);
  }

  guardarReceta() {
    const receta = {
      consultorio: (document.querySelector('input[type="text"]') as HTMLInputElement).value,
      doctor: (document.querySelector('input[type="text"]') as HTMLInputElement).value,
      fecha: (document.querySelector('input[type="date"]') as HTMLInputElement).value,
      diagnostico: (document.querySelector('textarea') as HTMLTextAreaElement).value,
      telefono: (document.querySelector('input[type="number"]') as HTMLInputElement).value,
      direccion: (document.querySelector('input[type="text"]') as HTMLInputElement).value,
      medicamentos: this.medicamentos
    };

    this.recetaService.registrarReceta(receta).subscribe({
      next: (response) => {
        console.log('Receta registrada con éxito', response);
        alert('Receta registrada con éxito');
      },
      error: (error) => {
        console.error('Error al registrar la receta', error);
        alert('Error al registrar la receta');
      }
    });
  }
}
