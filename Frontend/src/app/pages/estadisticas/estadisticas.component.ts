import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// // import { Label, Color } from 'ng2-charts';
// import { NgxChartsModule, Label, Color } from '@swimlane/ngx-charts';

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

  public registrarmedidas = new FormGroup({
    altura : new FormControl(0, [Validators.required]),
    peso : new FormControl(0, [Validators.required]),
    imc : new FormControl(0, [Validators.required]),
    brazo : new FormControl(0, [Validators.required]),
    cintura : new FormControl(0, [Validators.required]),
    muslo : new FormControl(0, [Validators.required])
  });

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(){
    var ids= 0;
    if(sessionStorage.getItem('id') != null){
      ids= parseInt(sessionStorage.getItem('id') || "0");
    }
    this.userservice.getDatos(ids).subscribe(
      (res) => {
        var ult= res[res.length-1];
        this.altura = ult.altura;
        this.peso = ult.peso;
        debugger;

        this.imc = parseFloat(((ult.peso/(ult.altura * ult.altura))*10000).toPrecision(4));

        this.brazo = ult.pbrazo;
        this.cintura = ult.pcintura;
        this.muslo = ult.pmuslo;
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