import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { buffer } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  constructor(private userservice: UserService, private domna: DomSanitizer ) { }

  public imagen : any;
  public lista: Array<any> = [];
  public tipo: any;

  ngOnInit(): void {
    this.tipo = sessionStorage.getItem('rol')? sessionStorage.getItem('rol'): "N";
    this.getposts();
  }

  getposts(){
    this.userservice.getPosts().subscribe(
      (res) => {
        this.lista = [];
        if(res.length>0){
          for(let i=0; i<res.length; i++){ 
            const hola = {
              imagen: "./../../../assets/images/posts/"+res[i].imagen,
              titulo: res[i].titulo,
              descripcion: res[i].descripcion,
              ubicacion: res[i].ubicacion,
              nick: res[i].nick,
              likes: res[i].likes,
              id: res[i].idp
            }
            this.lista.push(hola);
          }
        }
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }

  
}
