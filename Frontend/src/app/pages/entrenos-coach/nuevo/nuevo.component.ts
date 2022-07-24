import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  constructor(private userservice: UserService) { }

  public entrenoForm = new FormGroup({
    nombre: new FormControl(""),
    tiempo: new FormControl(""),
    fecha: new FormControl(""),
    ejers: new FormControl(""),
  });

  public nick: string = "";
  public ide: number = 0;
  public idc: number =0;
  public idt: number =0;
  public lista: Array<any> = [];
  public ejers: Array<any> = [];
  public texto: string = "";
  public series: number =0;
  public repes: number =0;
  public rir: number =0;
  public eja: Array<any> = [];
  public ejesid: Array<any> = [];
  public tipo = "";
  public eNombre = "";
  public eFecha = "";
  public eTiempo = 0;
  public eObs = "";
  public erir = 0;



  ngOnInit(): void {
    this.ide = parseInt(window.location.href.split("=")[1].split("&")[0]);
    this.idc = parseInt(window.location.href.split("=")[2].split("&")[0]);
    this.nick = window.location.href.split("=")[3].split("&")[0];
    this.idt = parseInt(window.location.href.split("=")[4]?.split("&")[0])? parseInt(window.location.href.split("=")[4]?.split("&")[0]): 0;
    this.getEjercicios();
    this.tipo="nuevo";
    if(this.idt!=0){
      this.tipo="modi";
      this.edit();
    }
  }

  getEjercicios(){
    this.userservice.getEjercicios(this.ide).subscribe(
      (res) => {
        if(res.length >0){
          this.ejers = [];
          for(let i=0;i<res.length;i++){
            const hola = {
              nombre: res[i].nombre,
              series: res[i].series,
              reps: res[i].reps,
              rir: res[i].rir,
              id: res[i].id
            }
            this.ejers.push(hola);
          }
        }
        
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }

  modal(){
    Swal.fire({
      title: "Añadir ejercicio",
      html: `
          <input type="text" id="text" placeholder="Nombre del ejercicio">
          <input type="number" id="series" class="series" placeholder="Series">
          <input type="number" id="repes" class="repes" placeholder="Repeticiones">
          <input type="number" id="rir" class="rir" placeholder="RIR">
       `,
      confirmButtonText: 'Añadir',
      confirmButtonColor: '#232a68',
      showCancelButton: true,
      width: '250px',        
      preConfirm: () => {
        this.texto = (document.getElementById(
          'text'
        ) as HTMLInputElement).value;

        this.series = parseInt((document.getElementById(
          'series'
        ) as HTMLInputElement).value);

        this.repes = parseInt((document.getElementById(
          'repes'
        ) as HTMLInputElement).value);

        this.rir = parseInt((document.getElementById(
          'rir'
        ) as HTMLInputElement).value);
        return { }
      }        
  }).then((result) => {
    if(!result.dismiss){
      this.userservice.newEjercicio(this.texto, this.series, this.repes, this.rir, this.ide).subscribe(
        (res) => {
            Swal.fire(
              'Ejercicio añadido!'
              );
            this.getEjercicios();          
        },
        (err) => {
          console.warn("Error respuesta api:", err);
        }
      );
    }
  })
  }

  mete(){
    const datos = (document.getElementById('ejericio') as HTMLInputElement).value;
    (document.getElementById('ejericio') as HTMLInputElement).value = "";

    let nombre = datos.split("|")[0];
    let series = datos.split("|")[1].split(":")[1];
    let repes = datos.split("|")[2].split(":")[1];
    let rir = datos.split("|")[3].split(":")[1];
    let id = parseInt(datos.split("|")[4]);

    const hola = {nombre: nombre, series: series, reps: repes, rir, id};
    this.eja.push(hola);
    this.ejesid.push(id);
  }

  borra(ida:number){
    var pos = this.ejesid.indexOf(ida);
    this.ejesid.splice(pos);
    this.eja.splice(pos);
  }

  crearEntreno(){
    var ayuda=this.entrenoForm.get('nombre')?.value;
    var ayuda1=this.entrenoForm.get('tiempo')?.value;
    var ayuda2=this.entrenoForm.get('fecha')?.value;
    var ejer = "";
    for (let k=0; k<this.ejesid.length; k++){
      if(k==this.ejesid.length-1){
        ejer+=this.ejesid[k];
      }
      else{
        ejer+=this.ejesid[k]+"/";
      }
    }

    this.entrenoForm.setValue ({
      nombre: ayuda? ayuda : "",
      tiempo: ayuda1? ayuda1 : "",
      fecha: ayuda2? ayuda2 : "",
      ejers: ejer,
    });

    if(this.idt==0){
      this.userservice.newEntreno(this.ide, this.idc,this.entrenoForm.value).subscribe(
        (res) => {
          Swal.fire(
            'Entrenamiento añadido!'
            );
          window.location.href="./entrenos-coach?ide="+this.ide+"&idc="+this.idc+"&nick="+this.nick;    
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
      );
    }
    else{
      this.userservice.updateEntreno(this.idt,this.entrenoForm.value).subscribe(
        (res) => {
          Swal.fire(
            'Entrenamiento modificado!'
            );
          window.location.href="./entrenos-coach?ide="+this.ide+"&idc="+this.idc+"&nick="+this.nick;    
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
      );
    }



  }

  atras(){
    window.location.href="./entrenos-coach?ide="+this.ide+"&idc="+this.idc+"&nick="+this.nick;
  }

  edit(){
    this.userservice.getEntreno(this.idt).subscribe(
      (res) => {
        if(res.length >0){
          this.eNombre = res[0].nomen;
          this.eTiempo = res[0].minutos;
          this.eFecha = res[0].fecha.split("T")[0].split("-")[0]+"-"+res[0].fecha.split("T")[0].split("-")[1]+"-"+res[0].fecha.split("T")[0].split("-")[2];
          this.eObs = res[0].obscliente;
          this.erir = res[0].erir? res[0].erir: 0 ;

          this.eja = [];
          for(let i=0;i<res.length;i++){
            const hola = {
              nombre: res[i].nomeje,
              series: res[i].series,
              reps: res[i].reps,
              rir: res[i].rir,
              id: res[i].id
            }
            this.eja.push(hola);
          }
        }
        
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }


}
