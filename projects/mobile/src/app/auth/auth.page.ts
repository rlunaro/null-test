import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-auth', 
  templateUrl: 'auth.page.html', 
  styleUrls: ['auth.page.scss']
})
export class AuthPage {

  email: string = "";
  password: string = "";

  constructor(private authService: AuthService ) {}

  onGoogleClick(){
    this.authService.test();
  }

  onEmailPasswordClick(){
    this.authService.signInWithEmailPassword( this.email, this.password );
  }

  onLogout(){
    this.authService.logout();
  }

  test(){
    this.authService.test2();
  }

}

