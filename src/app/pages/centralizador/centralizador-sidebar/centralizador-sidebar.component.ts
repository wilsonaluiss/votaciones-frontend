import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-centralizador-sidebar',
  templateUrl: './centralizador-sidebar.component.html',
  styles: [
  ]
})
export class CentralizadorSidebarComponent implements OnInit {

  constructor(public login:LoginService) { }

  ngOnInit(): void {
  }



  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
