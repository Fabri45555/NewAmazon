import { Product } from './../products/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/SERVICES/product.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ShoppingCartService } from 'src/app/SERVICES/shopping-cart.service';


@Component({
  selector: 'app-checkout-products',
  templateUrl: './checkout-products.component.html',
  styleUrls: ['./checkout-products.component.css']
})
export class CheckoutProductsComponent implements OnInit {

  @Input()
  checkout_products: Product[] = [];
  @Output()
  deleteEvent: EventEmitter<any> = new EventEmitter()

  constructor(public shopping_cart_service: ShoppingCartService, public productService : ProductService) {
  }

  ngOnInit(): void {
    console.log('products ', this.checkout_products)
  }

  removeItem(p: Product){
    this.shopping_cart_service.removerItem(p)
    this.deleteEvent.emit(p)
  }

  quantita(p:Product):void{
    let quantita = this.shopping_cart_service.getQuantity(p);
    if(quantita>1){
      this.shopping_cart_service.decrQuantity(p);
    }else{
      this.removeItem(p);
    }
  }

}
