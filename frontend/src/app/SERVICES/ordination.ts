import { ProductInOridination } from './product-in-oridination';
export class Ordination {

  id!:null;
  ordinationTime!:Date;
  productsInOrdination !: ProductInOridination[];


  constructor(id:null,ordinationTime:Date, productsInOrdination : ProductInOridination[]){
    this.id=id;
    this.ordinationTime=ordinationTime;
    this.productsInOrdination=productsInOrdination;
  }
}
