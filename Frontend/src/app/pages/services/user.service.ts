import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { tap, map, catchError } from "rxjs/operators";
import { loginForm, registerForm, registrarmedidas, registrarperfil, textForm, newpost } from '../../interfaces/login-form.interface';
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
            sessionStorage.setItem('x-token', res['token']);
            sessionStorage.setItem('id', res['id']);
            sessionStorage.setItem('rol', res['rol']);
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

    putDatos(id: number,formData: registrarmedidas){
      return this.http.put(`${environment.base_url}/customers/datos?id=`+id, formData, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    putPerfil(id: number,formData: registrarperfil){
      return this.http.put(`${environment.base_url}/customers/edit?id=`+id, formData, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getContactos(id: number){
      return this.http.get(`${environment.base_url}/customers/contacts?id=`+id, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getMensajes(ide: number, idr: number){
      return this.http.get(`${environment.base_url}/customers/mensajes?ide=`+ide+`&idr=`+idr, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    putMensajes(idr:number, ide: number, mens :string){
      return this.http.put(`${environment.base_url}/customers/mensajes?token=`+this.token+`&ide=`+ide+`&idr=`+idr+`&mensaje=`+mens, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getId(nick: string){
      return this.http.get(`${environment.base_url}/customers/nick?nick=`+nick).pipe(
        tap( (res : any) => {})
      );
    }

    mensajeNuevo(id: number, nick: string, texto: string){
      return this.http.put(`${environment.base_url}/customers/mensaje/nuevo?token=`+this.token+`&id=`+id+`&nick=`+nick+`&mensaje=`+texto, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    entrenofin(ide:number, rir: number, text: string){
      return this.http.put(`${environment.base_url}/customers/train/end?token=`+this.token+`&ide=`+ide+`&rir=`+rir+`&mensaje=`+text, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getExercises(id:number){
      return this.http.get(`${environment.base_url}/trainings/train?token=`+this.token+`&id=`+id, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getFeedings(id:number){
      return this.http.get(`${environment.base_url}/foods/food?token=`+this.token+`&id=`+id, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    comidafin(id:number){
      return this.http.put(`${environment.base_url}/feedings/edit/end?token=`+this.token+`&id=`+id,this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    nuevoPost(id: number, formData: newpost){
      return this.http.post(`${environment.base_url}/posts/register?token=`+this.token+`&id=`+id, formData,this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getPosts(){
      return this.http.get(`${environment.base_url}/posts`).pipe(
        tap( (res : any) => {})
      );
    }

    upload(formdata: any){
      return this.http.post(`${environment.base_url}/upload?token=`+this.token, formdata, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getClientes(id:number){
      return this.http.get(`${environment.base_url}/coaches/customers?token=`+this.token+`&id=`+id, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    deleteCliente(ide:number, idc: number){
      return this.http.delete(`${environment.base_url}/coaches/customer/delete?token=`+this.token+`&ide=`+ide+`&idc=`+idc, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    unirCliente(ide:number, nick: string){
      return this.http.put(`${environment.base_url}/coaches/customer/new?token=`+this.token+`&ide=`+ide+`&nick=`+nick, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getComidas(ide:number, idc: number){
      return this.http.put(`${environment.base_url}/coaches/customer/feeds?token=`+this.token+`&ide=`+ide+`&idc=`+idc, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getEntrenos(ide:number, idc: number){
      return this.http.put(`${environment.base_url}/coaches/customer/trains?token=`+this.token+`&ide=`+ide+`&idc=`+idc, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    getEjercicios(ide:number){
      return this.http.get(`${environment.base_url}/coaches/misEjercicios?token=`+this.token+`&ide=`+ide, this.cabeceras).pipe(
        tap( (res : any) => {})
      );
    }

    newEjercicio(nombre: string, series: number, repes: number, rir: number,ide:number){
      return this.http.post(`${environment.base_url}/coaches/newExercise?token=`+this.token+`&nombre=`+nombre+`&series=`+series+`&reps=`+repes+`&rir=`+rir+`&ide=`+ide, this.cabeceras).pipe(
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