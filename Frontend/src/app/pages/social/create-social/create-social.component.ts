import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-create-social',
  templateUrl: './create-social.component.html',
  styleUrls: ['./create-social.component.css']
})
export class CreateSocialComponent implements OnInit {

  public imagen: any;
  public imagen2: any;
  public formData: any;
  public imagen3: any;

  constructor(private _sanitizer: DomSanitizer, private userservice: UserService) { }
  
  public newpost = new FormGroup({
    imagen: new FormControl(""),
    titulo: new FormControl("", [Validators.required]),
    descripcion: new FormControl("", [Validators.required]),
    ubi: new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
  }

  publicar(){
    if (!this.newpost.valid || this.imagen == null) {      
      console.warn("Errores en el formulario");
      Swal.fire({
        title: "Ops!",
        text:
          "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        width: '230px'
      });
      return;
    }
    else{
      this.newpost.setValue({
        imagen: this.imagen3,
        titulo: this.newpost.value.titulo? this.newpost.value.titulo : "",
        descripcion: this.newpost.value.descripcion? this.newpost.value.descripcion : "",
        ubi: this.newpost.value.ubi? this.newpost.value.ubi : "",
      });      
    }
    var ids= 0;
    if(sessionStorage.getItem('id') != null){
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }

    this.userservice.nuevoPost(ids, this.newpost.value).subscribe(
      (res) => {
          Swal.fire({
            title: "Subido!",
            text:
              "Post subido correctamente",
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
            width: '230px'
          });
          window.location.href= "../social";
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }

  capturarimagen(event: any){
    const reader = new FileReader();    
    const file = event.target?.files[0];
    this.imagen2 = file;
    this.imagen3 = file.name;
    this.formData = new FormData();
    this.formData.append('imagesetes', file, file.name);
    this.userservice.upload(this.formData).subscribe(
      (res) => {
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagen = reader.result;
    }
  }

  

}
