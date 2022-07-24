import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto'
import { left, right } from '@popperjs/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(private userservice: UserService) { }
  public altura = 0;
  public peso = 0;
  public imc=0;
  public brazo = 0;
  public cintura = 0;
  public muslo = 0;

  public dataSource: Object | undefined;
  public mychart: any;
  public mychart2: any;
  public jsonStrVisitProv = '[]';
  public id: number =0;
  public viene: any = "";

  public registrarmedidas = new FormGroup({
    altura : new FormControl(0, [Validators.required]),
    peso : new FormControl(0, [Validators.required]),
    imc : new FormControl(0, [Validators.required]),
    brazo : new FormControl(0, [Validators.required]),
    cintura : new FormControl(0, [Validators.required]),
    muslo : new FormControl(0, [Validators.required])
  });

  ngOnInit(): void {
    if (window.location.href.split("=").length>1){
      this.id= parseInt(window.location.href.split("=")[1]);
      this.viene = "en";
    }
    else{
      this.id= parseInt(sessionStorage.getItem('id') || "0");  
      this.viene= "cli";    
    }
    this.getDatos();    
  }

  getDatos(){
    this.userservice.getDatos(this.id).subscribe(
      (res) => {
        var ult= res[res.length-1];
        this.altura = ult.altura;
        this.peso = ult.peso;
        this.imc = parseFloat(((ult.peso/(ult.altura * ult.altura))*10000).toPrecision(4));
        this.brazo = ult.pbrazo;
        this.cintura = ult.pcintura;
        this.muslo = ult.pmuslo;
        const data = {
          labels: [res[res.length-6]? 'Peso 6': null ,res[res.length-5]? 'Peso 5': null , res[res.length-4]? 'Peso 4': null , res[res.length-3]? 'Peso 3': null , res[res.length-2]? 'Peso 2': null, res[res.length-1]? 'Peso actual': null],
          datasets: [{
            label: 'Peso',
            backgroundColor: '#29317F',
            borderColor: '#29317F',
            data: [res[res.length-6]? res[res.length-6].peso: null ,res[res.length-5]? res[res.length-5].peso: null , res[res.length-4]? res[res.length-4].peso: null , res[res.length-3]? res[res.length-3].peso: null , res[res.length-2]? res[res.length-2].peso: null, res[res.length-1]? res[res.length-1].peso: null   ]
          }]
        };
        if(this.mychart){
          this.mychart.clear();
          this.mychart.destroy();
        }

        this.mychart = new Chart(  <HTMLCanvasElement> document.getElementById('myChart'), {
          type: 'line',
          data: data,
          options: { 
            scales: {
              y: {
                min: 70,
                max: 100,
                position: right 
              }
          }
        } });

        if(this.mychart2){
          this.mychart2.clear();
          this.mychart2.destroy();
        }


        this.mychart2 = new Chart(<HTMLCanvasElement> document.getElementById('myChart2'), {
          type: 'bar',
          data: {
            labels: ["Brazo", "Muslo", "Cintura"],
            datasets: [
              {
                label: "Medida 1",
                backgroundColor: "darkgray",
                data: [ res[res.length-3]? res[res.length-3].pbrazo : null, res[res.length-3]? res[res.length-3].pcintura : null, res[res.length-3]? res[res.length-3].pmuslo : null]
              }, {
                label: "Medida 2",
                backgroundColor: "darkgray",
                data: [res[res.length-2]? res[res.length-2].pbrazo : null,   res[res.length-2]? res[res.length-2].pcintura : null,res[res.length-2]? res[res.length-2].pmuslo : null]
              },
              {
                label: "Medida actual",
                backgroundColor: "#29317F",
                data: [res[res.length-1]? res[res.length-1].pbrazo : null,   res[res.length-1]? res[res.length-1].pcintura : null,res[res.length-1]? res[res.length-1].pmuslo : null]
              }
            ] 
          },
          options: {
            scales: {
              y: {
                min: 20,
                max: 80,
                position: right
              }
          }
      }});

      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    )
  }

  actualizar(){
      var altura2= this.registrarmedidas.get('altura')?.value;
      var peso2= this.registrarmedidas.get('peso')?.value;
      var imc2 = this.imc;

      var brazo2= this.registrarmedidas.get('brazo')?.value;
      var cintura2= this.registrarmedidas.get('cintura')?.value;
      var muslo2= this.registrarmedidas.get('muslo')?.value;
      if(altura2 == 0){
        altura2= this.altura
      }
      if(peso2 == 0){
        peso2= this.peso
      }
      if(brazo2 == 0){
        brazo2= this.brazo
      }
      if(cintura2 == 0){
        cintura2= this.cintura
      }
      if(muslo2 == 0){
        muslo2= this.muslo
      }

      this.registrarmedidas.setValue ({
        altura: altura2? altura2: 0,
        peso: peso2? peso2: 0,
        imc: imc2? imc2: 0,
        brazo: brazo2? brazo2: 0,
        cintura: cintura2? cintura2: 0,
        muslo: muslo2? muslo2: 0
      });

      var ids= 0;
    if(sessionStorage.getItem('id') != null){
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }

    this.userservice.putDatos(ids,this.registrarmedidas.value).subscribe(
      (res) => {
        this.getDatos();
          Swal.fire({
            title: "Guardado",
            text:
              "Guardado correctamente",
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
            width: '230px'
          });
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }
}