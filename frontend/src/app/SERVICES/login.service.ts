import { Router } from '@angular/router';
import { LoginComponent } from './../Pages/login/login.component';
import { OAuthService, AuthConfig, NullValidationHandler } from 'angular-oauth2-oidc';
import { Injectable, Input } from '@angular/core';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username: string ="";
  @Input() isLogged?: boolean;
  isAdmin:boolean =false;


  constructor(private oauthService: OAuthService,private router:Router) {
  }

  alert(){
    Swal.fire('Benvenuto '+this.getUsername(),'','success')
   }

  public login(): void{
      this.oauthService.initImplicitFlowInternal();
  }


  public logout(): void{
    this.oauthService.logOut();
  }


  public getIsLogged(): boolean {
    return(this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken());
  }


  public getIsAdmin():boolean{
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJason = atob(payload);
    const payloadDecoded=JSON.parse(payloadDecodedJason);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') != -1;
  }

  public getUsername(): string{
    const array = JSON.stringify(this.oauthService.getIdentityClaims());
    const x = array.split('given_name')[1];
    const f = x.substring(3,x.length);
    const num = f.indexOf("\"")
    const ret = f.substring(0,num);
    return ret;
  }



}


