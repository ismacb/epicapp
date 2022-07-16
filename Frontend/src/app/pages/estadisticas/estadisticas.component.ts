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
    altura : new FormControl("", [Validators.required]),
    peso : new FormControl("", [Validators.required]),
    imc : new FormControl("", [Validators.required]),
    brazo : new FormControl("", [Validators.required]),
    cintura : new FormControl("", [Validators.required]),
    muslo : new FormControl("", [Validators.required])
  });

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(){
    this.userservice.getDatos(24).subscribe(
      (res) => {
        var ult= res[res.length-1];
        this.altura = ult.altura;
        this.peso = ult.peso;
        this.imc=ult.imc;
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
    debugger;
    if (!this.registrarmedidas.valid) {      
      console.warn("Errores en el formulario");
      return;
    }
    this.userservice.login(this.registrarmedidas.value).subscribe(
      (res) => {
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