import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthPageRoutingModule } from "./auth-routing.module";
import { AuthPage } from "./auth.page";


@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    AuthPageRoutingModule
  ],
  declarations: [ AuthPage ]
})
export class AuthPageModule {}

