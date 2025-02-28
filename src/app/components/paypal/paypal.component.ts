import { Component } from '@angular/core';
declare var paypal: any;

@Component({
  selector: 'app-paypal',
  imports: [],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent {

  ngAfterViewInit(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: '10.00' }  // Cambia el valor según tu producto
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert(`Pago completado por ${details.payer.name.given_name}`);
          console.log('Detalles de la transacción:', details);
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
      }
    }).render('#paypal-button-container');
  }

}
