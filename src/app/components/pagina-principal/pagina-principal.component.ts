import { Component } from '@angular/core';
import { BarraNavegacionComponent } from "../barra-navegacion/barra-navegacion.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [BarraNavegacionComponent, RouterLink],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

}
