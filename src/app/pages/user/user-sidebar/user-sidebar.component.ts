import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(public login:LoginService) { }

  ngOnInit(): void {
  }


  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
