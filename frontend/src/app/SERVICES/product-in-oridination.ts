import { Product } from "../Components/products/product";
import { Ordination } from "./ordination";

export class ProductInOridination {

  id!:null;
  quantity!:number;
  ordination !: Ordination
  product!:Product;


  constructor(id:null,quantity:number,ordination :Ordination,product:Product){
    this.id =id;
    this.quantity=quantity;
    this.ordination =ordination;
    this.product=product;
  }

}
