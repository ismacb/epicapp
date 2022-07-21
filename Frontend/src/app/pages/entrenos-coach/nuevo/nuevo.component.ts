import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  constructor() { }

  public nick: string = "";
  public ide: number = 0;
  public idc: number =0;
  public idt: number =0;
  public lista: Array<any> = [];

  ngOnInit(): void {
    debugger;
    this.ide = parseInt(window.location.href.split("=")[1].split("&")[0]);
    this.idc = parseInt(window.location.href.split("=")[2].split("&")[0]);
    this.nick = window.location.href.split("=")[3].split("&")[0];
    this.idt = parseInt(window.location.href.split("=")[4]?.split("&")[0])? parseInt(window.location.href.split("=")[4]?.split("&")[0]): 0;
  }

}
