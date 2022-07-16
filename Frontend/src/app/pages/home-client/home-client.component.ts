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
  public lista = [];
  public safe : SafeHtml = ``;

  ngOnInit(): void {
    this.fechaactual();
    var fechahoy= '2022-07-15';
    this.entrenos(fechahoy);
    this.safe = this.transformYourHtml(this.mensaje);
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
        if(res.length > 0){
          this.lista = res;
          for(let p=0; p<res.length ; p++){
            if(res[p].totalkcal){
              // this.mensaje += `<div><button routerLink="./feed?id=`+res[p].id+` class="button-41" role="button">`+ res[p].tipo +`</button></div>`;
               this.mensaje += `<div><button class="button-41" role="button">`+ res[p].tipo +`</button></div><br>`;
            }
            else{
              // this.mensaje += `<div><button routerLink="./train?id=`+res[p].id+` class="button-40" role="button">`+ res[p].nombre +`</button></div>`;
              this.mensaje += `<div><button class="button-40" role="button">`+ res[p].nombre +`</button></div><br>`;
            }
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
