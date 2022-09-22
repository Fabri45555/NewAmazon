import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../Components/products/product';
import { UpProduct } from '../Components/products/UpProduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products : Product[] = [];
  product !: Product;
  id !:number; name!:string; descr!:string; price!:number;quantity!:number; barcode!:string; imageUrl!:string; ratings!:number;

  productURL= 'http://localhost:8080/products/';
  httpOptions = {headers: new HttpHeaders({'Content-Type' : 'application/json'})}
  constructor(private Http: HttpClient) { }

  public getProducts(): Observable<Product[]>{
    return this.Http.get<Product[]>(this.productURL+'all',this.httpOptions);

  }

  public findProductById(id:number) : Observable<Product>{
    return this.Http.get<Product>(this.productURL+'find/'+id,this.httpOptions);

  }

  public addProducts(product: Product): Observable<Product>{
    return this.Http.post<Product>(this.productURL+'add', product);
  }

  public updateProducts(product: UpProduct): Observable<Product>{
    return this.Http.put<Product>(this.productURL+'update', product);
  }

  public deleteProducts(productId: number): Observable<void>{
    return this.Http.delete<any>(this.productURL+'delete/'+productId,this.httpOptions);
  }

  getProdotti = ()=>{
    let products = localStorage.getItem('products')
    if(products)
      return JSON.parse(products);
  }

  setProdotto = (product : Product)=>{
    let products = this.getProdotti();
    if(products)
    {
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products))
    }else{
      this.products.push(product);
      localStorage.setItem('products',JSON.stringify(this.products));
    }
  }

  removeProduct = (product:Product) =>{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    if(index >= 0){
      products.splice(index,1);
      return localStorage.setItem('products', JSON.stringify(products))
    }
  }

  getProductId(product:Product) : void{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f ="";
    let ret = 0
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('id')[1];
        f = id.substring(2,id.length);
        ret = parseInt(f);

      }
      this.id = ret;
  }
  getProductName(product:Product) : void{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f=""
    let ret ="";
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('name')[1];
        f = id.substring(2,id.indexOf(','));
        ret=f.substring(1,f.length-1);
      }

      this.name = ret;
  }

  getProductN(product:Product) : string{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f=""
    let ret ="";
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('name')[1];
        f = id.substring(2,id.indexOf(','));
        ret=f.substring(1,f.length-1);
      }

      return ret;
  }
  getProductDesc(product:Product) : void{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f=""
    let ret ="";
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('description')[1];
        f = id.substring(2,id.indexOf(','));
        ret=f.substring(1,f.length-1);
      }

      this.descr = ret;

  }
  getProductPrice(product:Product) : void{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f ="";
    let ret = 0;
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('price')[1];
        f = id.substring(2,id.length);
        ret = parseInt(f);
      }
      this.price = ret;
  }
  getProductQuantity(product:Product) : void{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f ="";
    let ret = 0;
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('quantity')[1];
        f = id.substring(2,id.length);
        ret = parseInt(f);
      }
      this.quantity = ret;
  }

  getQuantity(product:Product) : number{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f ="";
    let ret = 0;
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('quantity')[1];
        f = id.substring(2,id.length);
        ret = parseInt(f);
      }
      return ret;
  }
  getProductBarcode(product:Product) : void{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f="";
    let ret ="";
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('barcode')[1];
        f = id.substring(2,id.indexOf(','));
        ret = f.substring(1,f.length-1)
      }
      this.barcode = ret;
  }
  getProductImageUrl(product:Product) : void{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f="";
    let ret ="";
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('imageUrl')[1];
        f = id.substring(2,id.indexOf(','));
        console.log(f)
        ret = f.substring(1,f.length-1);
      }
      this.imageUrl = ret;
  }

  getProductIm(product:Product) : string{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f="";
    let ret ="";
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('imageUrl')[1];
        f = id.substring(2,id.indexOf(','));
        console.log(f)
        ret = f.substring(1,f.length-1);
      }
      return ret;
  }

  getProductRatings(product:Product) : void{
    let products = this.getProdotti();
    const index = products.findIndex((item: {id: any;}) => item.id == product.id )
    let f ="";
    let ret =0;
    if(index >=0)
      {
        const x = JSON.stringify(product);
        const id = x.split('ratings')[1];
        const ind = x.lastIndexOf('ratings');
        f = id.substring(2,id.length);
        ret = parseInt(f);
      }
      this.ratings = ret;
  }


}
