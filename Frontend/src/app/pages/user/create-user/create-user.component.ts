import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { tap, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { of, Observable } from "rxjs";
import { Usuario } from "../../login/models/login.model";
import { UserService } from 'src/app/pages/services/user.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private userservice: UserService) {}
  private usuario: Usuario = new Usuario(0, "", "", "", "","");

  public registerForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.min(3)]),
    rol: new FormControl("", [Validators.required]),
    nick: new FormControl("", [Validators.required]),
    nombre:new FormControl("", [Validators.required]),
    apellidos: new FormControl("", [Validators.required]),
    edad: new FormControl("", [Validators.required]),
    telefono: new FormControl(""),
    titulacion: new FormControl(""),
    imagen: new FormControl(""),
  });

  ngOnInit(): void {
  }

  register(): void{
      if (!this.registerForm.valid) {      
        console.warn("Errores en el formulario");
        return;
      }
      this.userservice.register(this.registerForm.value).subscribe(
        (res) => {
          Swal.fire({
              title: "Bienvenido",
              text:
                "Tu cuenta se ha creado correctamente",
              icon: "success",
              confirmButtonText: "Ok",
              allowOutsideClick: false,
              width: '230px'
            }).then(function(){
              window.location.href="./login";
            })
            ;
        },
        (err) => {
          debugger;
          var mensaje= "";
            if(err.error.sqlMessage.includes("for key 'nick'")){
              mensaje = "Ya existe ese nick";
            }
            else{
              mensaje = "Ya existe ese email";
            }
            Swal.fire({
              title: "Ops!",
              text:
                mensaje,
              icon: "error",
              confirmButtonText: "Ok",
              allowOutsideClick: false,
              width: '230px'
            });
          console.warn("Error respuesta api:", err);
        }
      );
    }
}
