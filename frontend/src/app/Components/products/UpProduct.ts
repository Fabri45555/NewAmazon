export class UpProduct {

  id!: number;
  name!: string;
  description!: string;
  price!: number;
  quantity!: number;
  barcode!: string;
  imageUrl!: string;
  ratings!: number;

  constructor(id:number, name: string, desc: string, price: number,quantity:number, barcode:string , imageUrl:string, ratings:number){
    this.id =id;
    this.name = name;
    this.description = desc;
    this.price = price;
    this.quantity=quantity;
    this.barcode = barcode;
    this.imageUrl = imageUrl;
    this.ratings = ratings;
  }

}
