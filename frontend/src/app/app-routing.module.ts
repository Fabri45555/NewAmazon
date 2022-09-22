
import { OrdinationComponent } from './Pages/ordination/ordination.component';

import { UpdateComponent } from './Products/update/update.component';
import { AddComponent } from './Products/add/add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'add',component:AddComponent},
  {path:'update',component:UpdateComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'ordination', component: OrdinationComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
