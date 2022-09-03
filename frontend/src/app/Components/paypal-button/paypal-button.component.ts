import { ShoppingCartService } from './../../SERVICES/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';


@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {

  constructor(private shopping_cart:ShoppingCartService) {
    render(
      {
        id: "#myPaypalButtons",
        currency:"EUR",
        value: this.shopping_cart.getTotal().toString(),
        onApprove: (details) => {
          alert("Transazione avvenuta con successo!");
        }
      }
    );
  }

  ngOnInit(): void {
  }

}
