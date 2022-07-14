import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { tap, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { of, Observable } from "rxjs";
import { Usuario } from "./models/login.model";
import { UserService } from 'src/app/pages/services/user.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private userservice: UserService) {}
  private usuario: Usuario = new Usuario(0, "", "", "");
  
  public loginForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.min(3)]),
  });

  ngOnInit(): void {}

  login(): void {
    if (!this.loginForm.valid) {      
      console.warn("Errores en el formulario");
      return;
    }
    this.userservice.login(this.loginForm.value).subscribe(
      (res) => {
        if(res.ok){

        }
        else{
          Swal.fire({
            title: "Ops!",
            text:
              res.msg,
            icon: "error",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
            width: '230px'
          });
        }
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }

  logout(): void {
    this.limpiarLocalStore();
    this.router.navigateByUrl("/login");
  }

  limpiarLocalStore(): void {
    localStorage.removeItem("token");
  }

  campoValidoLogin( campo: string){
    let campoo = this.loginForm.get(campo);
    if(campoo!=null){
      return campoo.valid;
    }else{
      return true;
    }
  }

  validar(correcto: boolean, incorrecto: boolean): Observable<boolean> {
    if (this.token === "") {
      this.limpiarLocalStore();
      return of(incorrecto);
    }
  
    return this.http
      .get(`${environment.base_url}/login/token`, this.cabeceras)
      .pipe(
        tap((res: any) => {
          const {
            id,
            rol,
            nick,
            email,
            nombre,
            token,
          } = res;
          localStorage.setItem("token", token);
          this.usuario = new Usuario(
            id,
            rol,
            nick,
            email,
            nombre
          );
        }),
        map((res) => {
          return correcto;
        }),
        catchError((err) => {
          this.limpiarLocalStore();
          return of(incorrecto);
        })
      );
  }
  
  validarToken(): Observable<boolean> {
    return this.validar(true, false);
  }
    
  get rol(): string | undefined {
    return this.usuario.rol;
  }

  get nombre(): string | undefined {
    return this.usuario.nombre;
  }

  get email(): string | undefined {
    return this.usuario.email;
  }

  get nick(): string | undefined {
    return this.usuario.nick;
  }
  
  get id(): number {
    return this.usuario.id;
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
