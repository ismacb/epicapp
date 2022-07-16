import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/pages/services/user.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';


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

  public registrarperfil = new FormGroup({
    nombre : new FormControl("", [Validators.required]),
    apellidos : new FormControl("", [Validators.required]),
    edad : new FormControl(0, [Validators.required]),
    telefono : new FormControl(0, [Validators.required]),
    titulacion : new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil(){
    var ids= 0;
    if(sessionStorage.getItem('id') != null){
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }
    this.userservice.getPerfil(ids).subscribe(
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

  actualizar(){
    debugger;
    var nombre2= this.registrarperfil.get('nombre')?.value;
    var apellidos2= this.registrarperfil.get('apellidos')?.value;
    var edad2= this.registrarperfil.get('edad')?.value;
    var telefono2= this.registrarperfil.get('telefono')?.value;
    var titulacion2= this.registrarperfil.get('titulacion')?.value;

    if(nombre2 == ""){
      nombre2= this.nombre
    }
    if(apellidos2 == ""){
      apellidos2 = this.apellidos
    }
    if(edad2 == 0){
      edad2= this.edad
    }
    if(telefono2 == 0){
      telefono2= this.telefono
    }
    if(sessionStorage.getItem('rol') == "ENTRENADOR"){
      if(titulacion2 == ""){
        titulacion2= this.titulacion
      }
    }

    this.registrarperfil.setValue ({
      nombre: nombre2? nombre2: "",
      apellidos: apellidos2? apellidos2: "",
      edad: edad2? edad2: 0,
      telefono: telefono2? telefono2: 0,
      titulacion: titulacion2? titulacion2: ""
    });

    var ids= 0;
  if(sessionStorage.getItem('id') != null){
    ids= parseInt(sessionStorage.getItem('id') || "0");
  }

  this.userservice.putPerfil(ids,this.registrarperfil.value).subscribe(
    (res) => {
      this.getPerfil();
        Swal.fire({
          title: "Guardado",
          text:
            "Guardado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
          allowOutsideClick: false,
          width: '230px'
        });
    },
    (err) => {
      console.warn("Error respuesta api:", err);
    }
  );
}
}