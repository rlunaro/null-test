import { Component } from '@angular/core';
import { getRedirectResult } from '@angular/fire/auth';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( ) {
  }
}
