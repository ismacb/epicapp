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
  public mesnum = 0;
  public año = 2022;
  public mensaje = "";
  public fechahoy= '';
  public meses=['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  public comida: Array<any> = [];
  public entreno: Array<any> = [];


  ngOnInit(): void {
    this.fechaactual();
    this.montardia();
    this.entrenos(this.fechahoy);
  }

  montardia(){
    this.fechahoy= this.año+"-"+this.mesnum+"-"+this.dia;
  }

  entrenos(date: string){ 
    var ids= 0;
    if(sessionStorage.getItem('id') != null){   
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }
    this.userservice.getEntrenosNutricion(ids,date).subscribe(
      (res) => {
        this.comida= [];
        this.entreno= [];
          if(res.comida.length > 0){
            for(let i=0;i<res.comida.length; i++){
              const comid = { 
                tipo: res.comida[i].tipo,
                kcal: res.comida[i].totalkcal,
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
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }
  
  fechaactual(){
    var fecha= new Date();
    this.dia = fecha.getDate();
    this.mes = this.meses[fecha.getMonth()];
    this.mesnum = fecha.getMonth()+1;
  }

  ruta(id: number, nombre: string, tiempo: number){
    window.location.href="../entreno?id="+id+"&tie="+tiempo+"&nom="+nombre;
  }

  rutas(id: number, tipo: string, kcal: number){
    window.location.href="../comida?id="+id+"&tipo="+tipo+"&kcal="+kcal;
  }

  masdia(){
    this.dia++;
    this.montardia();
    this.entrenos(this.fechahoy);
  }

  menosdia(){
    this.dia--;
    this.montardia();
    this.entrenos(this.fechahoy);
  }

  masmes(){
    this.mesnum++;
    this.mes= this.meses[this.mesnum-1];
    this.montardia();
    this.entrenos(this.fechahoy);
  }

  menosmes(){
    this.mesnum--;
    this.mes= this.meses[this.mesnum+1]; 
    this.montardia();
    this.entrenos(this.fechahoy);
  }

}
