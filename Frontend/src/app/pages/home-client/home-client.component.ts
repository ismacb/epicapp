import { Component, OnInit, Sanitizer } from '@angular/core';
import { UserService } from '../services/user.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {
  constructor(private userservice: UserService, private sanitizer: DomSanitizer) { }

  public dia = 0;
  public mes = "";
  public mensaje = "";
  public comida: Array<any> = [];
  public entreno: Array<any> = [];


  ngOnInit(): void {
    this.fechaactual();
    var fechahoy= '2022-07-18';
    this.entrenos(fechahoy);
  }

  transformYourHtml(htmlTextWithStyle: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
}

  entrenos(date: string){ 
    var ids= 0;
    if(sessionStorage.getItem('id') != null){   
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }
    this.userservice.getEntrenosNutricion(ids,date).subscribe(
      (res) => {
        debugger;
        this.comida= [];
        this.entreno= [];
          if(res.comida.length > 0){
            for(let i=0;i<res.comida.length; i++){
              const comid = { 
                tipo: res.comida[i].tipo,
                kcal: res.comida[i].kcal,
                hecho: res.comida[i].hecho,
                id: res.comida[i].id,                
              }
              this.comida.push(comid);
            }
          }
          if(res.entrenamiento.length>0){
            for(let p=0; p<res.entrenamiento.length ; p++){
              const entre = {
                nombre: res.entrenamiento[p].nombre,
                minutos: res.entrenamiento[p].minutos,
                hecho: res.entrenamiento[p].hecho,
                id: res.entrenamiento[p].id,
              }
              this.entreno.push(entre);
            }            
          }   

        // else{
        //   this.mensaje+=`<div><button class="button-41" role="button" style="background-color: white; color: black;">Hoy no tienes nada pendiente...</button></div>`;
        // }
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }
  
  fechaactual(){
    var fecha= new Date();
    this.dia = fecha.getDate();
    var meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    this.mes = meses[fecha.getMonth()];
  }

  ruta(id: number){
    window.location.href="../entreno?id="+id;
  }

}
