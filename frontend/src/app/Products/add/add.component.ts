import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Component, Input, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/SERVICES/product.service';

import { Product } from 'src/app/Components/products/product';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  prodotto!:Product;
  id!:null;
  nomeProdotto!: string;
  descrizione!:string;
  prezzo!:number;
  quantita!:number;
  barcode!:null;
  imageUrl!:string;
  ratings!:number;
  form!:FormGroup;


  constructor(private productService:ProductService, private router:Router, public fb: FormBuilder) {
    this.form = fb.group({
      'nome' : ['',Validators.required],
      'descrizione' : ['',Validators.required],
      'prezzo' : ['',Validators.required],
      'quantita' : ['',Validators.required],
      'imageUrl' : ['',Validators.required],
      'ratings' : ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  checkUser() {
    let nome = this.form.controls['nome'].value;
    if(!(nome.lenght >=8)){
      this.form.controls['nome'].setErrors({incorect: true});
    }else{
      this.form.controls['nome'].setErrors(null);
    }
  }

  checkDesc() :void {
    let desc = this.form.controls['descrizione'].value;
    if(desc.lenght >=25){
      this.form.controls['descrizione'].setErrors({incorect: true})
    }else{
      this.form.controls['descrizione'].setErrors(null);
    }
  }

  create(): void{
    this.nomeProdotto= this.form.controls['nome'].value;
    this.descrizione = this.form.controls['descrizione'].value;
    this.prezzo =this.form.controls['prezzo'].value;
    this.quantita = this.form.controls['quantita'].value;
    this.imageUrl =this.form.controls['imageUrl'].value;
    this.ratings=this.form.controls['ratings'].value;
    this.prodotto = new Product(null,this.nomeProdotto,this.descrizione,this.prezzo,this.quantita,null,this.imageUrl,this.ratings);
    this.productService.addProducts(this.prodotto).subscribe(
      data => {
        console.log(data);
        this.back();
      },
      err => console.log(err)
    );
  }

  send():void{
    if(!this.form.valid){
      alert('Compilare tutti i campi obbligatori!');
      return;
    }
  }

  back(): void{
    this.router.navigate(['/products']);
  }


}
