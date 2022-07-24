import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {

    constructor(private userservice: UserService) { }
  
    public tipo: string = "";
    public kcal: number = 0;
    public text: string ="";
    public comida: number = 0;
    public lista: Array<any> = [];
  
  ngOnInit(): void {
    this.comida = parseInt(window.location.href.split("=")[1]);
    this.tipo = window.location.href.split("=")[2].split("&")[0];
    this.kcal = parseInt(window.location.href.split("=")[3]);
    this.alimentos();
  }
  
  alimentos(){
    this.userservice.getFeedings(this.comida).subscribe(
      (res) => {
        this.lista=[];
        for(let i=0;i<res.length;i++){
          const hola = {
            nombre: res[i].nombre ,
            cantidad: res[i].cantidad ,
            hc: res[i].hc ,
            proteina: res[i].proteina ,
            grasas: res[i].grasa ,
            kcal: res[i].kcal ,
          }
          this.lista.push(hola);
        }
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );    
  }  
  
  fincomida(){
    Swal.fire({
      title: "Comida realizada con éxito!",        
      confirmButtonText: 'Aceptar',
      icon: 'success',
      width: '250px',       
  }).then((result) => {
      this.userservice.comidafin(this.comida).subscribe(
        (res) => {
            Swal.fire(
              'Feedback reportado!'
              );
            window.location.href="../home-client";          
        },
        (err) => {
          console.warn("Error respuesta api:", err);
        }
      );    
  })  
  }

}
