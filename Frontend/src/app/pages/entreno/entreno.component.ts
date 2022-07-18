import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-entreno',
  templateUrl: './entreno.component.html',
  styleUrls: ['./entreno.component.css']
})
export class EntrenoComponent implements OnInit {

  constructor(private userservice: UserService) { }

  public seg: number = 0;
  public min: number = 0;
  public hora: number = 0;
  public interval: any;
  public entreno: number =0;
  public rir:number =0;
  public text: string ="";
  public lista: Array<any> = [];

ngOnInit(): void {
  this.entreno = parseInt(window.location.href.split("=")[1]);
  this.ejercicios();
}

ejercicios(){
  this.userservice.getExercises(this.entreno).subscribe(
    (res) => {
      this.lista=[]; 
      for(let i=0;i<res.length;i++){
        const hola = {
          nombre: res[i].nombre,
          series: res[i].series,
          reps: res[i].reps,
          rir: res[i].rir
        }
        this.lista.push(hola); 
      }
      debugger;
    },
    (err) => {
      console.warn("Error respuesta api:", err);
    }
  );    
}


startTimer() {
    this.interval = setInterval(() => {
      if(this.seg < 59) {
        this.seg ++;
      } 
      else if(this.min<59) {
        this.seg = 0;
        this.min++;
      }
      else{
        this.seg= 0;
        this.min= 0;
        this.hora++;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer(){
    clearInterval(this.interval);
    this.hora=0;
    this.min=0;
    this.seg=0;
  }

  finentreno(){
    Swal.fire({
      title: "Entreno finalizado con éxito!",
      html: `<input type="number" id="rir" class="rir" placeholder="RIR (1-10)">
       <input type="text" id="text" placeholder="Observaciones">`,
      confirmButtonText: 'Enviar',
      confirmButtonColor: '#232a68',
      showCancelButton: true,
      icon: 'success',
      width: '250px',        
      preConfirm: () => {
        const rir = parseInt((document.getElementById(
          'rir'
        ) as HTMLInputElement).value);

        const text = (document.getElementById(
          'text'
        ) as HTMLInputElement).value;

        this.rir = rir;
        this.text = text;
        return { }
      }        
  }).then((result) => {
      var ids= 0;
      if(sessionStorage.getItem('id') != null){
        ids= parseInt(sessionStorage.getItem('id') || "0");
      }
      this.userservice.entrenofin(this.entreno, this.rir, this.text).subscribe(
        (res) => {
            Swal.fire(
              'Feedback reportado!'
              );
            window.location.href="./home-client";          
        },
        (err) => {
          console.warn("Error respuesta api:", err);
        }
      );    
  })

  }

}
