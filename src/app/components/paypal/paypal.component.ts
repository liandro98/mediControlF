import { Component } from '@angular/core';
import { AuthServiceService } from '../../servicies/auth-service.service';
declare var paypal: any;

@Component({
  selector: 'app-paypal',
  imports: [],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent {
  constructor(private authService: AuthServiceService) {}

  ngAfterViewInit(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: '5.00' } // Las divisias estan en dolares
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert(`Pago completado por ${details.payer.name.given_name}`);
          console.log('Detalles de la transacción:', details);

          // Activar la suscripción premium
          this.authService.activatePremium().subscribe({
            next: (response) => {
              console.log('Suscripción premium activada:', response);
              alert('¡Suscripción premium activada con éxito!');
            },
            error: (err) => {
              console.error('Error al activar la suscripción premium:', err);
              alert('Error al activar la suscripción premium');
            },
          });
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
        alert('Error en el proceso de pago');
      }
    }).render('#paypal-button-container');
  }

}
