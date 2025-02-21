import { Component } from '@angular/core';
import { BarraNavegacionComponent } from "../barra-navegacion/barra-navegacion.component";

@Component({
    selector: 'app-pagina-bienvenida',
    standalone: true,
    imports: [BarraNavegacionComponent],
    templateUrl: './pagina-bienvenida.component.html',
    styleUrl: './pagina-bienvenida.component.css'
})
export class PaginaBienvenidaComponent {

}
