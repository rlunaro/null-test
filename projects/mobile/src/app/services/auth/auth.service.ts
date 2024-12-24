import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Auth, 
  AuthErrorCodes, 
  connectAuthEmulator, 
  getRedirectResult, 
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  User, 
  UserCredential,
  GoogleAuthProvider, 
  signInWithPopup} from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authChanged : Observable<User>;

  // xjx for debug only
  private testSubscription : Subscription;

  constructor(private auth: Auth,  
              @Inject(LOCALE_ID) private localeId: string ) { 
    this.auth.languageCode = localeId;
    // xjx for debug only
    // connectAuthEmulator( this.auth2, "http://localhost:9099" );
    this.authChanged = new Observable<User>( (subscriber) => {
      this.auth.onAuthStateChanged( user => subscriber.next( <any>user ) );
    });

    // as an example I will observe my own observable 
    this.testSubscription = this.authChanged.subscribe( (user) => {
      if( user ){
        console.log("A USER IS AUTHENTICATED");
        console.log( user );  
      }else{
        console.log("USER IS NOT AUTHENTICATED ANYMORE");
      }
    });

    this.getRedirectResult();

  }

  getRedirectResult(){
    // to get the result of the google authentication 
    getRedirectResult( this.auth )
    .then( (someValue) => {
      console.log("it seems that this is not working");
      console.log(someValue);
    })
    .catch( error => console.log(error));
  }

  signInWithEmailPassword( email: string, password: string ){
    signInWithEmailAndPassword( this.auth, email, password )
    .then( (userCredential:UserCredential) => {
      console.log("REGISTERED!!!!");
      console.log( userCredential );
    })
    .catch( (error) => {
      console.log("THIS IS THE CATCH PART OF THE PROMISE");
      if( error.code === AuthErrorCodes.INVALID_PASSWORD ){
        console.log("invalid password error");
      }else{
        console.log( "code: ", error.code );
        console.log( "name: ", error.name );
        console.log( "message: ", error.message );
        // this will print the error stack
        console.log(error);
      }
    });

  }

  logout(){
    this.auth.signOut();
  }

  test() {
    signInWithRedirect( this.auth, new GoogleAuthProvider() )
    .then( (result) => console.log( "this is the result of the sign-in", result ));
    /*
    signInWithPopup( this.auth, new GoogleAuthProvider() )
    .then( (userCred) => {
      console.log("this is the result of the promise" );
      console.log( userCred );
    });
    */
  }

  test2(){
    
  }
}


