import { ProductService } from './product.service';
import { Product } from './../Components/products/product';
import { Observable } from 'rxjs/internal/Observable';
import { ProductInOridination } from './product-in-oridination';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductInOrdinationService {

  productsInOrdinations : ProductInOridination[] = [];
  products : Product[]=[];
  quantity : number[]=[];
  productInOridinationUrl ='http://localhost:8080/product_in_ordination/';
  httpOptions={headers: new HttpHeaders({'Content-Type' : 'application/json'})}


  constructor(private Http:HttpClient) { }

  public getProductsInOrdination():Observable<ProductInOridination[]>{
    return this.Http.get<ProductInOridination[]>(this.productInOridinationUrl+'all',this.httpOptions);
  }

  public addProductsInOrdination(productInOrdination:ProductInOridination):Observable<ProductInOridination>{
    return this.Http.post<ProductInOridination>(this.productInOridinationUrl+'add',productInOrdination);
  }

  public updateProductsInOrdination(productInOrdination:ProductInOridination):Observable<ProductInOridination>{
    return this.Http.put<ProductInOridination>(this.productInOridinationUrl+'update',productInOrdination);
  }

  public deleteProductsInOrdination(productInOrdinationId:number):Observable<void>{
    return this.Http.delete<any>(this.productInOridinationUrl+'delete/'+productInOrdinationId,this.httpOptions);
  }


  getProduct=() =>{
    let products = localStorage.getItem("prodotti_ordinati");
    if(products)
      return JSON.parse(products);
  }

  setProduct(product: Product){
    let products = this.getProduct();
    if(products){
      products.push(product);
      localStorage.setItem("prodotti_ordinati",JSON.stringify(products));
    }else{
      this.products.push(product);
      localStorage.setItem("prodotti_ordinati",JSON.stringify(this.products));
    }
  }

  getQuantity=()=>{
    let quantita = localStorage.getItem("quantita");
    if(quantita)
      return JSON.parse(quantita);
  }

  setQuantity(q :number){
    let quantita = this.getQuantity();
    if(quantita){
      quantita.push(q);
      localStorage.setItem("quantita",JSON.stringify(quantita));
    }else{
      this.quantity.push(q);
      localStorage.setItem("quantita",JSON.stringify(this.quantity));
    }
  }

  removeItem = (p: Product)=>{
    let items = this.getProduct();
    let values=this.getQuantity()
    const index = items.findIndex((item: { id: any; }) => item.id == p.id)
    if(index >= 0){
      items.splice(index, 1);
      values.splice(index, 1);
      localStorage.setItem('quantita', JSON.stringify(values))
      return localStorage.setItem('prodotti_ordinati', JSON.stringify(items))
    }
  }

}
