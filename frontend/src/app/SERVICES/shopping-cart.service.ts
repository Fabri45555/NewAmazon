import { ProductService } from './product.service';
import { FormControlName } from '@angular/forms';

import { Injectable, Output, EventEmitter } from '@angular/core';

import { Product } from '../Components/products/product';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UpProduct } from '../Components/products/UpProduct';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shopping_cart_items: Product[] = [];
  id?:string;
  productURL= 'http://localhost:8080/products/';
  httpOptions = {headers: new HttpHeaders({'Content-Type' : 'application/json'})}
  products_id: Map<string,number> = new Map<string,number>();
 // productsValue : Product[] = [];
  values : number[] = [];
  quantita !:number;
  @Output()
  deleteEvent: EventEmitter<any> = new EventEmitter()


  constructor(private Http : HttpClient) {}


  public updateProducts(product: UpProduct): Observable<Product>{
    return this.Http.put<Product>(this.productURL+'update', product);
  }

  indice(id:string):number{
    let ret = -1;
    let products=this.getShoppingCartItems()
    for (let i = 0; i < products.length; i++) {
      const idCorr =this.getProductId(products[i]);
     // console.log(id==idCorr)
      if(id == idCorr){
          ret =  i;
        }
      }
    return ret;

  }

  contains(items: Product[], product: Product) : boolean{
      const x = this.getProductId(product);
 //   console.log(product)
      for(let i = 0; i < items.length; i++) {
      const element = this.getProductId(items[i]);
 //   console.log(element);
      if(element == x){
        return true;
      }
    }
    return false;
  }

  addProduct = (product: Product)=> {
    let items = this.getShoppingCartItems();
    let values = this.getProductsValue();
    let ind = this.indice(this.getProductId(product));
    if(this.contains(items,product)){ // se esistono items
       let currVal = values[ind]
        console.log(currVal)
        currVal++;
        values[ind]=currVal;
      localStorage.setItem('shopping_cart', JSON.stringify(items))
      localStorage.setItem('values', JSON.stringify(values))
    }else if(!this.contains(items,product))
    {
    items.push(product);
   //   console.log(ind)
     values.push(1)
  //    this.productsValue.push(product);
      localStorage.setItem('shopping_cart', JSON.stringify(items))
      localStorage.setItem('values', JSON.stringify(values))
    }
  }

  resetQuantity() : void{
    /*for(const x of this.productsValue){
      console.log(x)
        this.productsValue.pop();
        this.values.pop();
    }*/
    let values = this.getProductsValue();
    values.splice(0,values.length);
    localStorage.setItem('values',JSON.stringify(values));
  }

  getShoppingCartItems = ()=> {
    let items = localStorage.getItem('shopping_cart')
    if(items)
      return JSON.parse(items)
  }



  getProductsValue = () =>{
    let items = localStorage.getItem('values')
    if(items)
      return JSON.parse(items);
  }

  getCartLength():number{
    let lunghezza=0;
    const valori = this.getProductsValue();
    for (let i = 0; i < valori.length; i++) {
      lunghezza+=valori[i]
    }
    return lunghezza;
  }

  getTotal = ()=>{
    let items = this.getShoppingCartItems();
    let values = this.getProductsValue();
    let tot = 0;
    for(let i=0; i<items.length; i++){
      const valCorr = values[i];
      for(let x=0; x<valCorr;x++){
        tot += items[i].price;
      }
    }
    return tot;
  }

  removerItem = (p: Product)=>{
    console.log('Rimuovendo il prodotto', p)
    let items = this.getShoppingCartItems();
    let values=this.getProductsValue()
    const index = items.findIndex((item: { id: any; }) => item.id == p.id)
    if(index >= 0){
      items.splice(index, 1);
      values.splice(index, 1);
      localStorage.setItem('values', JSON.stringify(values))
      return localStorage.setItem('shopping_cart', JSON.stringify(items))
    }
  }

  removerAll = () =>{
    let items = this.getShoppingCartItems();
  //let values = this.getProductsValue();
    items.splice(0, items.length);
    for (let i= 0; i < localStorage.length; i++) {
      localStorage.removeItem
    }
    return localStorage.setItem('shopping_cart', JSON.stringify(items));
 //   localStorage.setItem('values',JSON.stringify(values));
  }


  decrQuantity(product:Product) : void{
    let products = this.getShoppingCartItems();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    if(index >=0)
      {
        let a = this.getShoppingCartItems();
        let b = this.getProductsValue();
        let ind = this.indice(this.getProductId(product));
        let currVal = b[ind];
        if(this.contains(a,product) && currVal>1 ){
          currVal--;
          b[ind] = currVal;
          localStorage.setItem('values',JSON.stringify(b))
        }
      }
  }


  getProductId(product:Product) : string{
    let products = this.getShoppingCartItems();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let ret ="";
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('id')[1];
        ret = id.substring(2,id.indexOf(','));
      }
      return ret;
  }

  getQuantity(product:Product): number{
    let ret;
    let values = this.getProductsValue();
  //console.log(id)
    let ind = this.indice(this.getProductId(product));
    ret = values[ind];
  //console.log(ret)
    if(ret){
      this.quantita=ret;
      return ret;
    }
    this.quantita=0;
    return 0
  }

}
