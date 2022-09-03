export class Product {

  id!: null;
  name!: string;
  description!: string;
  price!: number;
  quantity!:number;
  barcode!: null;
  imageUrl!: string;
  ratings!: number;

  constructor(id:null, name: string, desc: string, price: number,quantity:number, barcode:null,imageUrl:string,ratings:number){
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
