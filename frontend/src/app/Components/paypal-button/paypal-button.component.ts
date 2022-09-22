import { ProductService } from './../../SERVICES/product.service';
import { ProductInOrdinationService } from './../../SERVICES/product-in-ordination.service';
import { UpProduct } from './../products/UpProduct';
import { OrdinationService } from './../../SERVICES/ordination.service';
import { Ordination } from './../../SERVICES/ordination';
import { ProductInOridination } from './../../SERVICES/product-in-oridination';
import { ShoppingCartService } from './../../SERVICES/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { Product } from '../products/product';
import { HttpErrorResponse } from '@angular/common/http';



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
  ciao!:Ordination;

  constructor(private shopping_cart:ShoppingCartService,private productService : ProductService, private ordinationService:OrdinationService,private productInOrdinationService:ProductInOrdinationService) {
    render(
      {
        id: "#myPaypalButtons",
        currency:"EUR",
        value: this.shopping_cart.getTotal().toString(),
        onApprove: (details) => {
          this.data = details;
          alert("Transazione avvenuta con successo!");
          this.addOrder();
          this.setProductInOrdination();
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
      this.ordination = new Ordination(null,new Date(this.getData()),this.empty);
      for (let i = 0; i < this.shopping_cart.getShoppingCartItems().length; i++) {
        let product = this.shopping_cart.getShoppingCartItems()[i];
        let productInOrdination = new ProductInOridination(null,this.shopping_cart.getQuantity(product),this.ordination,product);
        this.productInOrdinationService.addProductsInOrdination(productInOrdination).subscribe(
          data=>{},
          err=>console.log(err));
        let newP = new UpProduct(product.id,product.name,product.desc,product.price,product.quantity-this.shopping_cart.getQuantity(product),product.barcode,product.imageUrl,product.ratings);
        this.productService.updateProducts(newP).subscribe(
          data=>{},
          err=>console.log(err)
        );
        this.productsInOrdination.push(productInOrdination);
      }
      this.ordination.productsInOrdination = this.productsInOrdination;
      console.log(this.ordination)
      this.ordinationService.addOrders(this.ordination).subscribe(
        data=>{console.log(data)},
        err=>console.log(err)
      );
      this.shopping_cart.removerAll();
      this.shopping_cart.resetQuantity();
    }
  }



    setProductInOrdination():void{
      if(this.getTransactionResult()){
        for (let i = 0; i < this.productsInOrdination.length; i++){
          const element = this.productsInOrdination[i];
          console.log(element);
          this.productInOrdinationService.setProduct(element.product);
          this.productInOrdinationService.setQuantity(element.quantity);
        }
      }
    }


  ngOnInit(): void {
  }

}
