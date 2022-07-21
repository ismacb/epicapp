import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-coach',
  templateUrl: './home-coach.component.html',
  styleUrls: ['./home-coach.component.css']
})
export class HomeCoachComponent implements OnInit {

  constructor(private userservice: UserService) { }

  public lista: Array<any> = []
  public id= 0;
  public nuevo = "";

  ngOnInit(): void {
    this.id=parseInt(sessionStorage.getItem('id') || "0");
    this.clientes();
  }

  clientes(){ 
    var ids= 0;
    if(sessionStorage.getItem('id') != null){   
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }
    this.userservice.getClientes(ids).subscribe(
      (res) => {
        if(res.length >0){
          this.lista = [];
          for(let i=0;i<res.length;i++){
            const hola = {
              nick: res[i].nick,
              id: res[i].id
            }
            this.lista.push(hola);
          }
        }
        
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }

  chat(id: number, nick: string){
    window.location.href= "./conver?id="+id+"&nick="+nick;
  }

  estadis(id: number){
    window.location.href= "./estadisticas?id="+id;
  }

  nuevoCliente(){
    Swal.fire({
      title: 'Inserta el nick del cliente',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Añadir',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.nuevo= login;       
        
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.userservice.unirCliente(this.id, this.nuevo).subscribe(
          (res) => {       
            Swal.fire(
              'Cliente añadido',
              'Cliente añadido con éxito.',
              'success'          
            );
            window.location.href='./home-coach';
          },
          (err) => {
            console.warn("Error respuesta api:", err);
          }
        )
      }
    })
  }

  deleteCliente(nick: string, idc: number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "El cliente "+nick+" se va a eliminar" ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userservice.deleteCliente(this.id, idc).subscribe(
          (res) => {         
            Swal.fire(
              'Borrado!',
              'Cliente borrado.',
              'success'
            )
            window.location.href='./home-coach';
          },
          (err) => {
            console.warn("Error respuesta api:", err);
          }
        )
      }
    })
  }

  entrenos(idc: number, nick: string){
    window.location.href= "./entrenos-coach?ide="+this.id+"&idc="+idc+"&nick="+nick;
  }

  comidas(idc: number, nick: string){
    window.location.href= "./comidas-coach?ide="+this.id+"&idc="+idc+"&nick="+nick;
  }

}
