import { Product } from "../Components/products/product";
import { ProductInOridination } from "./product-in-oridination";

export class UpProductInOrdination {

  id!:null;
  quantity!:number;
  productsInOrdination!: ProductInOridination[];
  product!:Product;


  constructor(id:null,quantity:number,productsInOrdination:ProductInOridination[] ,product:Product ){
    this.id =id;
    this.quantity=quantity;
    this.productsInOrdination =productsInOrdination;
    this.product=product;
  }

}
