import  Swal  from 'sweetalert2';
import { ProductService } from 'src/app/SERVICES/product.service';
import { ProductInOridination } from './../../SERVICES/product-in-oridination';
import { OrdinationService } from './../../SERVICES/ordination.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpOrdination } from './../../SERVICES/up-ordination';
import { Router, Data } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ProductInOrdinationService } from 'src/app/SERVICES/product-in-ordination.service';
import { Ordination } from 'src/app/SERVICES/ordination';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/Components/products/product';

@Component({
  selector: 'app-ordination',
  templateUrl: './ordination.component.html',
  styleUrls: ['./ordination.component.css']
})
export class OrdinationComponent implements OnInit {

  UpOrdination!:UpOrdination;
  orders : Ordination[] = [];
  products : Product[]=[];
  quantity : number[]=[];
  ordini : string[]=[];
  lunghezza !: number;

  constructor(private ruoter:Router,private fb:FormBuilder,private productService:ProductService,public ordinationService:OrdinationService, public productInOrdinationService:ProductInOrdinationService) {

  }

  ngOnInit(): void {
    this.getProducts()
    this.getOrders();
   // this.getQuantity();
  }

  getProducts() : Product[]{
    let s = localStorage.getItem("prodotti_ordinati");
    let z = localStorage.getItem("quantita");
    if(s && z){
      let x =JSON.parse(s); let y = JSON.parse(z);
      for (let i = 0; i < x.length; i++) {
        this.products.push(x[i]);
        this.quantity.push(y[i]);
      }
    }
    console.log(this.products)
    return this.products;
  }

  alert(product:Product){
    Swal.fire({
      title: 'Sei sicuro di voler cancellare il tuo oridine',
      showDenyButton:true,
      confirmButtonText:'Cancella',
      denyButtonText: 'Non Cancellare',
    }).then((result: { isConfirmed: any; isDenied: any; })=>{
      if(result.isConfirmed){
        Swal.fire('Cancellato!','','success')
        this.onDelete(this.orders[this.products.indexOf(product)])
        this.productInOrdinationService.removeItem(product);
        this.backO();
      }else if(result.isDenied){
        Swal.fire('Ordine non cancellato','','error')
      }
    })
  }

  getOrders():void{
    this.ordinationService.getOrders().subscribe(
      (response:Ordination[]) => {
        this.orders=response;
        console.log(response);
        this.lunghezza = this.orders.length;
        console.log(this.lunghezza)
      },
      (error :HttpErrorResponse)=>{
        alert(error.message);
      }
      );
  }

  backO():void{
    window.location.reload()
  }

  onDelete(ordination :Ordination):void{
    const index = this.orders.findIndex((item: {id: any;}) => item.id == ordination.id )
    let f ="";
    let ret = 0
    if(index >=0)
      {
        const x = JSON.stringify(ordination);
        const id = x.split('id')[1];
        f = id.substring(2,id.length);
        ret = parseInt(f);
      }
      this.ordinationService.deleteOrder(ret).subscribe(
        data=>{
          console.log(data);
        },
        err=>console.log(err)
      );
  }

  check(): boolean{
    if(this.lunghezza==0){
      console.log(this.orders.length)
      return true;
    }
    return false;
  }

  checkData(data:Date):boolean{
    let dataCurr = new Date().getDay;
    if(data.getDay < dataCurr)
      return false;
    return true;
  }

  data(data:Date) : string{
    let stringa = JSON.stringify(data);
    let giorno = stringa.slice(1,stringa.indexOf("T"));
    return giorno;
  }
  ora(data:Date) : string{
    let stringa = JSON.stringify(data);
    let ora = stringa.slice(stringa.indexOf("T")+1,stringa.indexOf("."));
    return ora;
  }

  productName(products : ProductInOridination[]): string{

    for (let i = 0; i < products.length; i++) {
      let s =localStorage.getItem("prodotti_ordinati");
      if(s)
      {
        let x = JSON.parse(s)
        for (let i = 0; i < x.length; i++) {
          const element = x[i];
          console.log(x.length)
       //   let x = JSON.parse(s[i]);
          return this.productService.getProductN(element);
        }
      }
    }
    return "";

  }


  productsIn(products : ProductInOridination[]): string{

      let s = localStorage.getItem("prodotti_ordinati");
      if(s){
        let x = JSON.parse(s);
        for (let i = 0; i < x.length; i++) {
          const element = x[i];
       //   console.log(element)

          return this.productService.getProductN(element);
        }
      }
  //}
    return "";
  }

  back(){
    this.ruoter.navigate(["/products"]);
  }

}
