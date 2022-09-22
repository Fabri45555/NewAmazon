import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Pages/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { LoginComponent } from './Pages/login/login.component';
import { BannerComponent } from './Components/banner/banner.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './SERVICES/product.service';
import { ProductsComponent } from './Components/products/products.component';
import { CheckoutProductsComponent } from './Components/checkout-products/checkout-products.component';
import { CheckoutSubtotalComponent } from './Components/checkout-subtotal/checkout-subtotal.component';
import { MatMenuModule } from '@angular/material/menu';


import { OAuthModule } from 'angular-oauth2-oidc'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './Products/add/add.component';
import { UpdateComponent } from './Products/update/update.component';
import { PaypalButtonComponent } from './Components/paypal-button/paypal-button.component';
import { OrdinationComponent } from './Pages/ordination/ordination.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CheckoutComponent,
    LoginComponent,
    BannerComponent,
    ProductsComponent,
    CheckoutProductsComponent,
    CheckoutSubtotalComponent,
    AddComponent,
    UpdateComponent,
    PaypalButtonComponent,
    OrdinationComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:4200/'],
        sendAccessToken: true
    }

    })
  ],
  providers: [ProductService, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
