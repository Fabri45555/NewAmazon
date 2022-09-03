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
  lunghezza:number=0;
  products_id: Map<string,number> = new Map<string,number>();
  @Output()
  deleteEvent: EventEmitter<any> = new EventEmitter()


  constructor(private Http : HttpClient) { }


  public updateProducts(product: UpProduct): Observable<Product>{
    return this.Http.put<Product>(this.productURL+'update', product);
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
  //console.log(items)
  //console.log(this.contains(items,product))
    if(this.contains(items,product)){ // se esistono items
      this.lunghezza++;
      console.log(this.products_id);
      localStorage.setItem('shopping_cart', JSON.stringify(items))
    }else if(!this.contains(items,product))
    {
      console.log(this.products_id);
      this.lunghezza++;
      items.push(product);
      localStorage.setItem('shopping_cart', JSON.stringify(items))
    }
  }

  resetQuantity() : void{
    for(const x of this.products_id.keys()){
        console.log(x)
        this.products_id.delete(x);
    }
  }

  getShoppingCartItems = ()=> {
    let items = localStorage.getItem('shopping_cart')
    if(items)
      return JSON.parse(items)
  }

  getCartLength = ()=>{
    return this.getShoppingCartItems().length;
  }

  getTotal = ()=>{
    let items = this.getShoppingCartItems();
    let tot = 0;
    for(let i=0; i<items.length; i++){
      tot += items[i].price;
    }
    return tot;
  }

  removerItem = (p: Product)=>{
    console.log('Rimuovendo il prodotto', p)
    let items = this.getShoppingCartItems();
    const index = items.findIndex((item: { id: any; }) => item.id == p.id)
    if(index >= 0){
      items.splice(index, 1);
      this.lunghezza--;
      return localStorage.setItem('shopping_cart', JSON.stringify(items))
    }
  }

  removerAll = () =>{
    let items = this.getShoppingCartItems();
    items.splice(0, items.length);
    for (let i= 0; i < localStorage.length; i++) {
      localStorage.removeItem
    }
    return localStorage.setItem('shopping_cart', JSON.stringify(items))
  }


  addQuantity(product:Product) : void{
    let id =this.getProductId(product);
    console.log()
    if(this.products_id.has(id)){
        let x = this.products_id.get(id);
        //console.log(x)
        if(x){
            x++;
            this.products_id.set(id,x);
          }
          else{
            this.products_id.set(id,1);
          }
        }
    else if(!this.products_id.has(id)){
        this.products_id.set(id,1);
    }
  }

  decrQuantity(product:Product) : void{
    let products = this.getShoppingCartItems();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let ret ="";
    this.lunghezza--;
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('id')[1];
        ret = id.substring(2,id.indexOf(","));
        if(this.products_id.has(ret)){
          let x = this.products_id.get(ret);
          console.log(x)
          if(x){
              x--;
              this.products_id.set(ret,x);
          }
        }
        else{
          this.removerItem(product);
          this.deleteEvent.emit(product)
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
    let id = this.getProductId(product);
  //console.log(id)
    if(this.products_id.has(id)){
      ret=this.products_id.get(id);
    }
  //console.log(ret)
    if(ret)
      return ret;
    return 0
  }

}
