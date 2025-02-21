import { Component } from '@angular/core';
import { BarraNavegacionComponent } from "../barra-navegacion/barra-navegacion.component";

@Component({
    selector: 'app-servicios',
    standalone: true,
    imports: [BarraNavegacionComponent],
    templateUrl: './servicios.component.html',
    styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

}
