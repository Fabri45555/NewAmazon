import { ShoppingCartService } from 'src/app/SERVICES/shopping-cart.service';
import { LoginService } from './../../SERVICES/login.service';
import { UpProduct } from './../../Components/products/UpProduct';
import { Product } from './../../Components/products/product';
import { ProductService } from 'src/app/SERVICES/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  product!:UpProduct;
  form!:FormGroup;
  nome!: string; descrizione!:string; prezzo!:number; quantita!:number;imageUrl!:string; ratings!:number;

  constructor(public productService: ProductService, public shopping:ShoppingCartService, private router: Router, private fb:FormBuilder) {
    this.form = fb.group({
      'nome' : [this.productService.name,Validators.required],
      'descrizione' : [this.productService.descr,Validators.required],
      'prezzo' : [this.productService.price,Validators.required],
      'quantita' : [this.productService.quantity, Validators.required],
      'imageUrl' : [this.productService.imageUrl,Validators.required],
      'ratings' : [this.productService.ratings,Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onUpdate(): void{
    this.nome = this.form.controls['nome'].value;
    if(!this.nome){
      this.nome = this.productService.name;
    }
    this.descrizione = this.form.controls['descrizione'].value;
    if(!this.descrizione){
      this.descrizione = this.productService.descr;
    }
    this.prezzo = this.form.controls['prezzo'].value;
    if(!this.prezzo){
      this.prezzo = this.productService.price;
    }
    this.quantita = this.form.controls['quantita'].value;
    if(!this.quantita){
      this.quantita = this.productService.quantity;
    }
    this.imageUrl = this.form.controls['imageUrl'].value;
    if(!this.imageUrl){
      this.imageUrl = this.productService.imageUrl;
    }
    this.ratings = this.form.controls['ratings'].value;
    if(this.ratings<=0 ){
      this.ratings = this.productService.ratings;
    }
    this.product = new UpProduct(this.productService.id,this.nome,this.descrizione,this.prezzo,this.quantita,this.productService.barcode,this.imageUrl,this.ratings );
    console.log(this.product);
    this.productService.updateProducts(this.product).subscribe(
      data => {
        console.log(data);
        this.back();
      },
      err => console.log(err)
    );
  }

  back(): void{
    this.router.navigate(['/products']);
  }

}
