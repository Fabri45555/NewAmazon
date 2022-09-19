import { Product } from "../Components/products/product";
import { Ordination } from "./ordination";

export class ProductInOridination {

  id!:null;
  quantity!:number;

  product!:Product;


  constructor(id:null,quantity:number, product:Product ){
    this.id =id;
    this.quantity=quantity;
    this.product=product;
  }

}
