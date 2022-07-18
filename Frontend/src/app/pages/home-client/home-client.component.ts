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
  public lista: Array<any> = [];


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
        this.lista= [];
        if(res.length > 0){   
          for(let p=0; p<res.length ; p++){
            const hola = {
              tipo : res[p].tipo
            }
            this.lista.push(hola);
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

}
