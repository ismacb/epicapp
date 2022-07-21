import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comidas-coach',
  templateUrl: './comidas-coach.component.html',
  styleUrls: ['./comidas-coach.component.css']
})
export class ComidasCoachComponent implements OnInit {

   constructor(private userservice: UserService) { }


  public nick: string = "";
  public ide: number = 0;
  public idc: number =0;
  public lista: Array<any> = [];


  ngOnInit(): void {
    this.ide = parseInt(window.location.href.split("=")[1].split("&")[0]);
    this.idc = parseInt(window.location.href.split("=")[2].split("&")[0]);
    this.nick = window.location.href.split("=")[3];
    this.getComidas();
  }

  getComidas(){
    this.userservice.getComidas(this.ide, this.idc).subscribe(
      (res) => {
        this.lista=[];
        for(let i=0;i<res.length;i++){
          const hola = {
            id: res[i].id,
            tipo: res[i].tipo,            
            hecho: res[i].hecho
          }
          this.lista.push(hola); 
        }
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }

  nueva(){
    window.location.href="../nueva?ide="+this.ide+"&=idc"+this.idc+"&nick="+this.nick;
  }

}
