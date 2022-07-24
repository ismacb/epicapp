import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  constructor(private userservice: UserService) { }
  
  public personas: any = [];
  public id: Array<any> = [];
  public nick = "";
  public text = "";

  ngOnInit(): void {
    this.getContacts();

  }

  getContacts(){
    var ids= 0;
    if(sessionStorage.getItem('id') != null){
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }
    this.userservice.getContactos(ids).subscribe(
      (res) => {
        this.id = [];
        for(let p=0;p < res.length;p++){
          let as= 0;
          if(res[p].id_emisor == ids){
            as= res[p].id_receptor;
          }
          else{
            as= res[p].id_emisor
          }
          const hola = {
            nick : res[p].nick,
            id : as
          }
          this.id.push(hola);
        }
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    ); 
  }

  conver(id: number, nick: string){
    window.location.href= './conver?id='+id+'&nick='+nick;
  }

  nuevo(){
    var fallo = false;
    Swal.fire({
        title: "Enviar mensaje a",
        html: `<input type="text" id="nick" class="nick" placeholder="Nick" [(ngModel)]="nick">
         <input type="text" id="text" placeholder="Mensaje">`,
        confirmButtonText: 'Enviar',        
        allowOutsideClick: true,
        showCancelButton: true,
        width: '230px',        
        preConfirm: () => {
          const nick = (document.getElementById(
            'nick'
          ) as HTMLInputElement).value;

          const text = (document.getElementById(
            'text'
          ) as HTMLInputElement).value;

          if(text == "" || nick == ""){
            fallo= true;
          }

          this.nick = nick;
          this.text = text;
          return { }
        }        
    }).then((result) => {
      if(!result.dismiss){
      
      if(fallo){
        Swal.fire(
          'Debes escribir el nick y un mensaje!'
        )
      }
      else{
        var ids= 0;
        if(sessionStorage.getItem('id') != null){
          ids= parseInt(sessionStorage.getItem('id') || "0");
        }
        this.userservice.mensajeNuevo(ids, this.nick,this.text).subscribe(
          (res) => {
            if(res.length == 0){
              Swal.fire(
                'Este nick no existe :('
              );
            }
            else if(res == "mismo"){
              Swal.fire(
                'No te puedes escribir a ti mismo'
                );
            }
            else{
              Swal.fire(
                'Mensaje enviado!'
                );
            }
            this.getContacts();
          },
          (err) => {
            Swal.fire(
              'Este nick no existe'
            );
            console.warn("Error respuesta api:", err);
          }
        );
      }
    }
    })

  }

}
