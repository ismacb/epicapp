import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-conver',
  templateUrl: './conver.component.html',
  styleUrls: ['./conver.component.css']
})
export class ConverComponent implements OnInit {

  constructor(private userservice: UserService) { }

  public idr= 0;
  public nick = "";
  public tipo : any = [];
  public msg : any  = [];
  public ide= 0;
  public personas = ['Pepe', 'Pedro'];

  public todo: Array<any> = [];

  public textForm = new FormGroup({
    mensaje: new FormControl(""),
    ide: new FormControl(0),
    idr: new FormControl(0),
  });


  ngOnInit(): void {
    this.idr = parseInt(window.location.href.split("=")[1]);
    this.nick = window.location.href.split("=")[2];
    this.mensajes();
  }

  mensajes(){
    var ids= 0;
    if(sessionStorage.getItem('id') != null){
      ids= parseInt(sessionStorage.getItem('id') || "0");
      this.ide = ids;
    }
    this.userservice.getMensajes(ids, this.idr ).subscribe(
      (res) => {
        this.todo = [];
        for(let p=0; p<res.length;p++){
          var tipo = "receptor";
          if(res[p].id_emisor == ids){
            tipo = "emisor";
          }
          const hola = {
            tipos : tipo,
            mens : res[p].mensaje
          }
          this.todo.push(hola);
        }

        
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }

  enviarmensaje(){
    var ids= 0;
    if(sessionStorage.getItem('id') != null){
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }
    
    var mens = this.textForm.get('mensaje')?.value;
    
    this.textForm.setValue ({
      mensaje: mens? mens: "",
      ide: this.ide,
      idr: this.idr,
    });
    
    this.userservice.putMensajes(this.ide, this.idr, mens? mens: "").subscribe(
      (res) => {
        this.textForm.reset();
        this.mensajes();
      
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }

}
