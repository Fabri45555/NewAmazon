import { Router } from '@angular/router';
import { LoginService } from './../../SERVICES/login.service';
import { OAuthService, AuthConfig, NullValidationHandler } from 'angular-oauth2-oidc';
import { Component, createPlatform, Injectable, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  username :string="";
  isLogged?: boolean;
  isAdmin:boolean =false;

  constructor(private oauthService:OAuthService, public loginService: LoginService,public router:Router){ this.configure();}


  ngOnInit(): void {

    }


  authConfig: AuthConfig = {
    issuer: 'http://localhost:8180/auth/realms/Amazon',
    redirectUri: window.location.origin + '/index.html',
    clientId: 'amazon-frontend-client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  back(){
    window.location.replace("http://localhost:4200/checkout");
  }

  back1(){
    window.location.replace("http://localhost:4200/products");
  }


  checkout():boolean{
    if(this.router.url=="/checkout"){
      console.log("jnda")
      return true;
    }else{
      console.log("kndad ")
      return false;
    }
  }

  configure(): void{
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(()=> this.oauthService.tryLogin()).
    then(()=>{
      if(this.oauthService.getIdentityClaims()){
        this.isLogged = this.loginService.getIsLogged();
        this.isAdmin = this.loginService.getIsAdmin();

      }
    })
  }

}
