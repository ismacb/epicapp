import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Formulario reactivo
import { HttpClientModule } from "@angular/common/http";
import { UserComponent } from '../pages/user/user.component';
import { HomeClientComponent } from '../pages/home-client/home-client.component';
import { NavbarComponent } from '../common/navbar/navbar.component';


@NgModule({
  declarations: [
  
    UserComponent,
    HomeClientComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: []

})
export class Common{ }