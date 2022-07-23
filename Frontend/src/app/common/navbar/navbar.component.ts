import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/pages/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login: UserService) {
  }
  public token = sessionStorage.getItem('x-token');
  public rol = sessionStorage.getItem('rol');
  public pag = "";
  public menu: any;

  ngOnInit(): void {
    this.menu = ["home", "group", "sms", "monitoring", "perfil"];
    this.pag = window.location.href.split("/")[3];
  }
  
  clicka(donde: string){
    for(let k=0;k< this.menu.length; k++){
      if(this.menu[k]==donde){
        (document.getElementById(this.menu[k]) as HTMLBodyElement).style.backgroundColor = "darkgray"; 
        (document.getElementById(this.menu[k]) as HTMLBodyElement).style.color = "#232a68" ; 
      }
      else{
        (document.getElementById(this.menu[k]) as HTMLBodyElement).style.backgroundColor = "#232a68"; 
        (document.getElementById(this.menu[k]) as HTMLBodyElement).style.color = "darkgray" ; 
      }

    }
    

  }

}
