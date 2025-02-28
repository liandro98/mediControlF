import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaypalComponent } from "../paypal/paypal.component";

@Component({
    selector: 'app-barra-navegacion',
    standalone: true,
    imports: [RouterLink, PaypalComponent],
    templateUrl: './barra-navegacion.component.html',
    styleUrl: './barra-navegacion.component.css'
})
export class BarraNavegacionComponent {

}
