import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { tap, map, catchError } from "rxjs/operators";
import { loginForm, registerForm, registrarmedidas } from '../../interfaces/login-form.interface';
import { Usuario } from "../login/models/login.model";
import { Router } from '@angular/router';


//Comunicación con la API - Usuarios
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor( private http: HttpClient,private router: Router ) {  }
  private user: Usuario = new Usuario(0,'', '', '', '', '');

    login(formData: loginForm) {
        return this.http.post(`${environment.base_url}/login`, formData).pipe(
          tap( (res : any) => {
            debugger;
            sessionStorage.setItem('x-token', res['token']);
            const { id, rol, nick, email, nombre, token } = res;
            this.user = new Usuario(id, rol, nick, email, nombre, token); 
          })
        );
    }

    register( formData: registerForm) {
        return this.http.post(`${environment.base_url}/coaches/register`, formData).pipe(
          tap( (res : any) => {
            //sessionStorage.setItem('x-token', res['token']);
            const { id, rol, nick, nombre, email, token } = res;
            this.user = new Usuario(id, rol, nick, email, nombre, token); 
          })
        );
    }

    getEntrenosNutricion(id: number, date: string){
      return this.http.get(`${environment.base_url}/customers/trainfeed?id=`+id+`&fecha=`+date, this.cabeceras).pipe(
        tap ((res : any) => {
        })
      );
    }

    getPerfil(id: number){
      return this.http.get(`${environment.base_url}/customers/customer?id=`+id, this.cabeceras).pipe(
        tap ((res : any) => {
        })
      );
    }

    getDatos(id: number){
      return this.http.get(`${environment.base_url}/customers/metricas?id=`+id, this.cabeceras).pipe(
        tap ((res : any) => {
        })
      );
    }

    putDatos(formData: registrarmedidas){
      return this.http.put(`${environment.base_url}/customers/datos`, formData, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

      get rol(): string {
        return this.user.rol;
      }
    
      get nombre(): string {
        return this.user.nombre;
      }
    
      get email(): string{
        return this.user.email;
      }
    
      get nick(): string {
        return this.user.nick;
      }
      
      get id(): number {
        return this.user.id;
      }
      
      get token(): string {
        return sessionStorage.getItem("x-token") || "";
      }

      get cabeceras() {
        return {
          headers: {
            "x-token": this.token,
          },
        };
      }
}