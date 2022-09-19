import { OrdinationService } from './../../SERVICES/ordination.service';
import { Ordination } from './../../SERVICES/ordination';
import { ProductInOridination } from './../../SERVICES/product-in-oridination';
import { ShoppingCartService } from './../../SERVICES/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';



@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {

  data !: any
  productsInOrdination : ProductInOridination[] = []
  empty : ProductInOridination[] = []
  ordination !: Ordination;
  newOrdination!:Ordination;

  constructor(private shopping_cart:ShoppingCartService, private ordinationService:OrdinationService) {
    render(
      {
        id: "#myPaypalButtons",
        currency:"EUR",
        value: this.shopping_cart.getTotal().toString(),
        onApprove: (details) => {
          this.data = details;
          alert("Transazione avvenuta con successo!");
          this.addOrder();
        }
      }
    );
  }

  getTransactionResult() :boolean{
    let operation = JSON.stringify(this.data);
    let x ="";
    let ret = ""
    const status = operation.split('status')[1];
    x = status.substring(2,status.indexOf(","));
    ret = x.substring(1,x.length-1);
    if(ret == "COMPLETED")
      return true;
    return false;
  }

  getData():string{
    let operation = JSON.stringify(this.data);
    let x ="";
    let ret = ""
    const status = operation.split('update_time')[1];
    x = status.substring(2,status.indexOf("}"));
    ret = x.substring(1,x.length-1);
    return ret;
  }

  addOrder() : void{
    if(this.getTransactionResult())
    {
      this.ordination = new Ordination(null,new Date(this.getData()),this.productsInOrdination);
      console.log(this.ordination)
      for (let i = 0; i < this.shopping_cart.getShoppingCartItems().length; i++) {
        const product = this.shopping_cart.getShoppingCartItems()[i];
        console.log(product)
        let productInOrdination = new ProductInOridination(null,this.shopping_cart.getQuantity(product),product)
     //   product = product.quantity -this.shopping_cart.getQuantity(product);
        this.productsInOrdination.push(productInOrdination);
        console.log(this.productsInOrdination)
      }
      this.newOrdination = new Ordination(null,new Date(this.getData()),this.productsInOrdination);
      console.log(this.newOrdination);
      this.shopping_cart.removerAll();
      this.shopping_cart.resetQuantity();
      this.ordinationService.addOrders(this.newOrdination).subscribe(
        data => {
          console.log(data);
        },
        err => (console.log(err))
      );
    }else{return}
  }

  ngOnInit(): void {
  }

}
