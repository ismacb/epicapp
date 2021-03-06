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

  ngOnInit(): void {
    this.pag = window.location.href.split("/")[3];
  }

}
