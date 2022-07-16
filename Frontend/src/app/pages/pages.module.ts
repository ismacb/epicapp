import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Formulario reactivo
import { HttpClientModule } from "@angular/common/http";
import { UserComponent } from './user/user.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [  
    UserComponent,
    HomeClientComponent,
    
  ],
  exports: [
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    NgChartsModule,
    MatTableModule,
    CommonModule
  ],
  entryComponents: []

})
export class PagesModule { }