import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/pages/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private userservice: UserService) { }
  public nombre = "";
  public apellidos = "";
  public nick="";
  public edad = 0;
  public telefono = 0;
  public email = "";
  public titulacion ="";
  public rol = "";
  public esconde = false;

  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil(){
    this.userservice.getPerfil(24).subscribe(
      (res) => {
        this.nombre = res[0].nombre;
        this.apellidos = res[0].apellidos;
        this.edad = res[0].edad;
        this.email = res[0].email;
        this.telefono = res[0].telefono;
        this.nick = res[0].nick;
        if(res[0].rol == "CLIENTE"){
          this.rol = "Cliente";
        }
        else{
          this.rol = "Entrenador";
          this.titulacion = res[0].titulacion;
          this.esconde = true;
        }
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    )
  }
}