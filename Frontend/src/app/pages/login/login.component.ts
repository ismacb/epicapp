import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { tap, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { of, Observable } from "rxjs";
import { Usuario } from "./models/login.model";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder,) {}
  private usuario: Usuario = new Usuario(0, "", "", "");

  ngOnInit(): void {
  }

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email] ],
    password: ['', Validators.required ] 
  }); //Objeto de tipo formbuilder

  login(){
    return this.http.post(`${environment.base_url}/login`, this.loginForm).pipe(
      tap((res: any) => {
        localStorage.setItem("token", res["token"]);
        const { id, rol, nick, nombre, email } = res;
        this.usuario = new Usuario(id, rol, nick, email, nombre);
      })
    );
  }

  logout(): void {
    this.limpiarLocalStore();
    this.router.navigateByUrl("/login");
  }

  limpiarLocalStore(): void {
    localStorage.removeItem("token");
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
