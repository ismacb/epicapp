import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './user/create-user/create-user.component';


const routes: Routes = [   
    { path: '', component: HomeComponent},
    { path: 'login',component: LoginComponent},
    { path: 'register', component: CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
