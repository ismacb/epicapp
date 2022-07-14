import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Formulario reactivo
import { HttpClientModule } from "@angular/common/http";
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
  
    UserComponent,
  ],
  exports: [
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: []

})
export class PagesModule { }