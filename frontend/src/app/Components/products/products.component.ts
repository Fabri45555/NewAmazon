import Swal from 'sweetalert2';
import { LoginService } from './../../SERVICES/login.service';
import { ProductService } from 'src/app/SERVICES/product.service';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import { ShoppingCartService } from '../../SERVICES/shopping-cart.service'
import { Product } from './product';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input()
  products: Product[] = [];
  product!:Product;
  @Output()
  deleteEvent: EventEmitter<any> = new EventEmitter();


  constructor(public shopping_cart: ShoppingCartService,private router:Router, public productService: ProductService,public activateRoute: ActivatedRoute, public loginService:LoginService) {
  }

  ngOnInit(): void {
  }

  addToCart(product: Product){
    this.shopping_cart.addProduct(product);
  }

  storageProducts(product:Product){
    this.productService.setProdotto(product);
  }


  deleteProd(p:Product){
    this.productService.removeProduct(p)
    this.deleteEvent.emit(p);
  }

  findProduct(product:Product){
    this.productService.getProductId(product);
    this.productService.getProductName(product);
    this.productService.getProductDesc(product);
    this.productService.getProductPrice(product);
    this.productService.getProductQuantity(product);
    this.productService.getProductBarcode(product);
    this.productService.getProductImageUrl(product);
    this.productService.getProductRatings(product);
  }


  onDelete(product :Product) : void{
  let products = this.productService.getProdotti();
  const index = products.findIndex((item: {id: any;}) => item.id == product.id )
  let f ="";
  let ret = 0
  if(index >=0)
    {
      const x = JSON.stringify(product);
      const id = x.split('id')[1];
      f = id.substring(2,id.length);
      ret = parseInt(f);

    }
    this.productService.deleteProducts(ret).subscribe(
      data => {
        console.log(data);
        this.productService.getProducts();
      },
      err => console.log(err)
    );
  }

  back(): void{
    window.location.reload()
  }

  alert(){
    Swal.fire('Prodotto aggiunto correttamente al carrello','','success')
   }

   alert2(){
    Swal.fire('Limite prodotto superato!','','error');
   }

   checkQuantity(p:Product) : void{
    let qProd = this.productService.getQuantity(p);
    let qCart = this.shopping_cart.getQuantity(p)
    if(qCart < qProd)
    {
      this.addToCart(p);
      this.alert()
    }
    else{
      this.alert2();
    }
   }



}

