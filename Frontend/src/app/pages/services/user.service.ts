import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { tap, map, catchError } from "rxjs/operators";
import { loginForm, registerForm } from '../../interfaces/login-form.interface';
import { Usuario } from "../login/models/login.model";



//Comunicación con la API - Usuarios
@Injectable({
  providedIn: 'root'
})

export class UserService {

    private user: Usuario = new Usuario(0,'', '', '');
    constructor( private http: HttpClient ) {  }

    login( formData: loginForm) {
        return this.http.post(`${environment.base_url}/login`, formData).pipe(
          tap( (res : any) => {
            sessionStorage.setItem('x-token', res['token']);
            const { id, rol, nick, nombre, email } = res;
            this.user = new Usuario(id, rol, nick, email, nombre); 
          })
        );
    }

    register( formData: registerForm) {
        debugger;
        return this.http.post(`${environment.base_url}/coaches/register`, formData).pipe(
          tap( (res : any) => {
            sessionStorage.setItem('x-token', res['token']);
            const { id, rol, nick, nombre, email } = res;
            this.user = new Usuario(id, rol, nick, email, nombre); 
          })
        );
    }


      get rol(): string | undefined {
        return this.user.rol;
      }
    
      get nombre(): string | undefined {
        return this.user.nombre;
      }
    
      get email(): string | undefined {
        return this.user.email;
      }
    
      get nick(): string | undefined {
        return this.user.nick;
      }
      
      get id(): number {
        return this.user.id;
      }
        
      get cabeceras() {
        return {
          headers: {
            "x-token": this.token,
          },
        };
      }
      
      get token(): string {
        return localStorage.getItem("token") || "";
      }
}