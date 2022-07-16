import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule, CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }