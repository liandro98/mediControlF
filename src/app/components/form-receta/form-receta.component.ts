import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';


@Component({
    selector: 'app-form-receta',
    standalone: true,
    imports: [FormsModule, CommonModule],
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
}
