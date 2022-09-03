import { LoginService } from './../../SERVICES/login.service';
import { LoginComponent } from './../../Pages/login/login.component';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/SERVICES/shopping-cart.service';

@Component({
  selector: 'app-checkout-subtotal',
  templateUrl: './checkout-subtotal.component.html',
  styleUrls: ['./checkout-subtotal.component.css']
})
export class CheckoutSubtotalComponent implements OnInit {

  constructor(public shoppingCart: ShoppingCartService, public loginService :LoginService) { }

  ngOnInit(): void {
  }

}
