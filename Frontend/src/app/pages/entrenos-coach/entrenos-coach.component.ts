import { Component, OnInit } from '@angular/core';
import { windowWhen } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-entrenos-coach',
  templateUrl: './entrenos-coach.component.html',
  styleUrls: ['./entrenos-coach.component.css']
})
export class EntrenosCoachComponent implements OnInit {

  constructor(private userservice: UserService) { }

  public nick: string = "";
  public ide: number = 0;
  public idc: number =0;
  public lista: Array<any> = [];

  ngOnInit(): void {
    this.ide = parseInt(window.location.href.split("=")[1].split("&")[0]);
    this.idc = parseInt(window.location.href.split("=")[2].split("&")[0]);
    this.nick = window.location.href.split("=")[3];

    this.getEntrenos();
  }

  getEntrenos(){
    this.userservice.getEntrenos(this.ide, this.idc).subscribe(
      (res) => {
        this.lista=[];
        for(let i=0;i<res.length;i++){
          const hola = {
            id: res[i].id,
            nombre: res[i].nombre,
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

  nuevo(){
    window.location.href="./nuevo?ide="+this.ide+"&idc="+this.idc+"&nick="+this.nick;
  }

  edit(idt: number){
    window.location.href="./nuevo?ide="+this.ide+"&idc="+this.idc+"&nick="+this.nick+"&idt="+idt;
  }


}
