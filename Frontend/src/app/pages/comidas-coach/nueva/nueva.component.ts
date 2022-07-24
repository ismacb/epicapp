import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {

  constructor(private userservice: UserService) { }

  public comidaForm = new FormGroup({
    tipo: new FormControl(""),
    kcal: new FormControl(""),
    fecha: new FormControl(""),
    alim: new FormControl(""),
  });

  public nick: string = "";
  public ide: number = 0;
  public idc: number =0;
  public idt: number =0;
  public lista: Array<any> = [];
  public alimentos: Array<any> = [];
  public texto: string = "";
  public kcal: number =0;
  public hc: number =0;
  public pro: number =0;
  public grasas: number =0;
  public cantidad: number =0;
  public alis: Array<any> = [];
  public alisid: Array<any> = [];
  public tipo = "";
  public etipo = "";
  public ekcal = 0;
  public efecha = "";
  public eObs = "";



  ngOnInit(): void {
    this.ide = parseInt(window.location.href.split("=")[1].split("&")[0]);
    this.idc = parseInt(window.location.href.split("=")[2].split("&")[0]);
    this.nick = window.location.href.split("=")[3].split("&")[0];
    this.idt = parseInt(window.location.href.split("=")[4]?.split("&")[0])? parseInt(window.location.href.split("=")[4]?.split("&")[0]): 0;
    this.tipo="nuevo";
    this.ekcal = 0;
    if(this.idt!=0){
      this.tipo="modi";
      this.edit();
    }
    this.getAlimentos();
  }

  getAlimentos(){
    this.userservice.getAlimentos(this.ide).subscribe(
      (res) => {
        if(res.length >0){
          this.alimentos = [];
          for(let i=0;i<res.length;i++){
            const hola = {
              nombre: res[i].nombre,
              kcal: res[i].kcal,
              cantidad: res[i].cantidad,
              id: res[i].id
            }
            this.alimentos.push(hola);
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
      title: "Añadir alimento",
      html: `
          <input type="text" id="text" placeholder="Nombre del alimento">
          <input type="number" id="cantidad" class="cantidad" placeholder="Cantidad">
          <input type="number" id="hc" class="hc" placeholder="Hidratos">
          <input type="number" id="pro" class="pro" placeholder="Proteina">
          <input type="number" id="grasas" class="grasas" placeholder="Grasas">
          <input type="number" id="kcal2" class="kcal" placeholder="Kcal">
       `,
      confirmButtonText: 'Añadir',
      confirmButtonColor: '#232a68',
      showCancelButton: true,
      width: '250px',        
      preConfirm: () => {
        this.texto = (document.getElementById(
          'text'
        ) as HTMLInputElement).value;

        this.kcal = parseInt((document.getElementById(
          'kcal2'
        ) as HTMLInputElement).value);

        this.cantidad = parseInt((document.getElementById(
          'cantidad'
        ) as HTMLInputElement).value);

        this.hc = parseInt((document.getElementById(
          'hc'
        ) as HTMLInputElement).value);

        this.pro = parseInt((document.getElementById(
          'pro'
        ) as HTMLInputElement).value);

        this.grasas = parseInt((document.getElementById(
          'grasas'
        ) as HTMLInputElement).value);

        return { }
      }        
  }).then((result) => {
    if(!result.dismiss){
      this.userservice.newAlimento(this.texto, this.kcal, this.cantidad, this.hc,this.pro, this.grasas, this.ide).subscribe(
        (res) => {
            Swal.fire(
              'Alimento añadido!'
              );
            this.getAlimentos();          
        },
        (err) => {
          console.warn("Error respuesta api:", err);
        }
      );
    }
  })
  }

  mete(){
    const datos = (document.getElementById('alimento') as HTMLInputElement).value;
    (document.getElementById('alimento') as HTMLInputElement).value = "";


    let nombre = datos.split("|")[0];
    let gramos = datos.split("|")[1].split(":")[1];
    let kcal = datos.split("|")[2].split(":")[1];
    let id = parseInt(datos.split("|")[3]);

    this.ekcal+= parseInt(kcal);

    const hola = {nombre: nombre, cantidad: gramos, kcal: kcal, id: id};
    this.alis.push(hola);
    this.alisid.push(id);
  }

  borra(ida:number){
    var pos = this.alisid.indexOf(ida);
    this.alisid.splice(pos);
    this.alis.splice(pos);
  }

  crearEntreno(){
    var ayuda=this.comidaForm.get('tipo')?.value;
    var ayuda1=(document.getElementById('kcal3') as HTMLInputElement).value;
    var ayuda2=this.comidaForm.get('fecha')?.value;
    var alip = "";
    for (let k=0; k<this.alisid.length; k++){
      if(k==this.alisid.length-1){
        alip+=this.alisid[k];
      }
      else{
        alip+=this.alisid[k]+"/";
      }
    }

    this.comidaForm.setValue ({
      tipo: ayuda? ayuda : "",
      kcal: ayuda1? ayuda1 : "",
      fecha: ayuda2? ayuda2 : "",
      alim: alip,
    });

    if(this.idt==0){
      this.userservice.newComida(this.ide, this.idc,this.comidaForm.value).subscribe(
        (res) => {
          Swal.fire(
            'Comida añadida!'
            );
          window.location.href="./comidas-coach?ide="+this.ide+"&idc="+this.idc+"&nick="+this.nick;    
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
      );
    }
    else{
      this.userservice.updateComida(this.idt,this.comidaForm.value).subscribe(
        (res) => {
          Swal.fire(
            'Comida modificada!'
            );
          window.location.href="./comidas-coach?ide="+this.ide+"&idc="+this.idc+"&nick="+this.nick;    
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
      );
    }



  }

  atras(){
    window.location.href="./comidas-coach?ide="+this.ide+"&idc="+this.idc+"&nick="+this.nick;
  }

  edit(){
    this.userservice.getComida(this.idt).subscribe(
      (res) => {
        if(res.length >0){
          this.etipo = res[0].tipo;
          this.ekcal= res[0].totalkcal;
          this.efecha = res[0].fecha.split("T")[0].split("-")[0]+"-"+res[0].fecha.split("T")[0].split("-")[1]+"-"+res[0].fecha.split("T")[0].split("-")[2];
          this.eObs = res[0].obscliente;

          this.alis = [];
          for(let i=0;i<res.length;i++){
            const hola = {
              nombre: res[i].nombre,
              cantidad: res[i].cantidad,
              hc: res[i].hc,
              pro: res[i].pro,
              grs: res[i].grasas,
              kcal: res[i].kcal,
              id: res[i].id
            }
            this.alis.push(hola);
          }
        }
        
      },
      (err) => {
        console.warn("Error respuesta api:", err);
      }
    );
  }
}
