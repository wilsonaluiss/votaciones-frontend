import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-operador-sidebar',
  templateUrl: './operador-sidebar.component.html',
  styles: [
  ]
})
export class OperadorSidebarComponent implements OnInit {

  constructor(public login:LoginService) { }

  ngOnInit(): void {
  }


  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
