import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ConverComponent } from '../conver/conver.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  constructor(private userservice: UserService) { }
  
  public personas: any = [];
  public id: Array<any> = [];

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
          const hola = {
            nick : res[p].nick,
            id : res[p].id_receptor
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
    Swal.fire({
        title: "Enviar mensaje a",
        html: `<input type="text" id="nick" class="nick" placeholder="Nick">
         <input type="text" id="text" placeholder="Mensaje">`,
        confirmButtonText: 'Enviar',        
        allowOutsideClick: true,
        showCancelButton: true,
        width: '230px',
        preConfirm: () => {
          const nick = Swal.getPopup()?.getElementsByClassName("nick")[0];

          debugger;
          return { }
        }
    }).then((result) => {
      debugger;
      if(result.isDismissed){

      }
      else{
        //this.userservice.getId(document.getElementById('nick'))
        
        Swal.fire(
          'Mensaje enviado!',
          'success'
        )
      }
    })

  }

}
