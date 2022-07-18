import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ChatComponent } from './chat/chat.component';
import { ConverComponent } from './conver/conver.component';
import { EntrenoComponent } from './entreno/entreno.component';
import { ComidaComponent } from './comida/comida.component';


const routes: Routes = [   
    { path: '', component: HomeComponent},
    { path: 'login',component: LoginComponent},
    { path: 'register', component: CreateUserComponent},
    { path: 'home-client', component: HomeClientComponent},
    { path: 'perfil', component: PerfilComponent},
    { path: 'estadisticas', component: EstadisticasComponent},
    { path: 'chat', component: ChatComponent},
    { path: 'conver', component: ConverComponent},
    { path: 'comida', component: ComidaComponent},
    { path: 'entreno', component: EntrenoComponent},
    // { path: 'home-coach', component: HomeCoachComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
