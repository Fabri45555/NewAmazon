import { AuthConfig, OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amazon-clone';

 @Input()
  isLogged: boolean | undefined;

}
