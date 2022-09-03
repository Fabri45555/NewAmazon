
import { ProductInOridination } from './product-in-oridination';
export class UpOrdination {
  id!:number;
  ordinationInTime!:Date;
  productsInOrdination!:ProductInOridination[];

  constructor(id:number,ordinationTime:Date,productsInOrdination:ProductInOridination[]){
    this.id=id;
    this.ordinationInTime=ordinationTime;
    this.productsInOrdination=productsInOrdination;
  }
}
