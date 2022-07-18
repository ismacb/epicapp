import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { UserComponent } from './pages/user/user.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CommonModule } from '@angular/common';
import { ConverComponent } from './pages/conver/conver.component';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { EntrenoComponent } from './pages/entreno/entreno.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CreateUserComponent,
    UserComponent,
    EstadisticasComponent,
    PerfilComponent,
    ConverComponent,
    ChatComponent,
    HomeClientComponent,
    EntrenoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
