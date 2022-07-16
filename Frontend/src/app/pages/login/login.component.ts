import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/pages/services/user.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userservice: UserService) {}
  
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
          if(this.userservice.rol == "CLIENTE"){
            window.location.href = "./home-client";
          }
          else{
            window.location.href = "./home-coach";            
          }
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
}
