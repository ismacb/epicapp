import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { NavbarComponent } from '../common/navbar/navbar.component';


const routes: Routes = [   
    { path: '', component: HomeComponent},
    { path: 'login',component: LoginComponent},
    { path: 'register', component: CreateUserComponent},
    { path: 'home-client', component: HomeClientComponent},
    // { path: 'home-coach', component: HomeCoachComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
