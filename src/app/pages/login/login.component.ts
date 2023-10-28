import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": "",
    "password": ""
  }

  constructor(private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == '') {
      this.snack.open("Username is empty", "OK", {
        duration: 3000
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == '') {
      this.snack.open("Password is empty", "OK", {
        duration: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        //console.log(data);
        this.loginService.login(data.token);
        this.loginService.generateToken(this.loginData).subscribe(
          (user: any) => {
            console.log(user);
            this.loginService.setUser(user);
            
            if (this.loginService.getUserRol() == 'CIUDADANO') {
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubjec.next(true);

            } else if (this.loginService.getUserRol() == 'ADMIN') {
              this.router.navigate(['user-dashboard']);
              this.loginService.loginStatusSubjec.next(true);
            }else if(this.loginService.getUserRol() == 'CUENTAHABIENTE'){
              this.router.navigate(['cuentahabiente-dashboard']);
              this.loginService.loginStatusSubjec.next(true);
            }else if(this.loginService.getUserRol() == 'CENTRALIZADOR'){
              this.router.navigate(['centralizador-dashboard']);
              this.loginService.loginStatusSubjec.next(true);
            }else if(this.loginService.getUserRol() == 'OPERADOR'){
              this.router.navigate(['operador-dashboard']);
              this.loginService.loginStatusSubjec.next(true);
            } else {
              this.snack.open("Usario no encontrado", "OK", {
                duration: 3000
              });
              this.loginService.logout();
            }
          }
        );
      }, (error) => {
        console.log(error);
        this.snack.open("Datos invalidos, vuelva a intentar", "OK", {
          duration: 3000
        });
      }
    );
  }

  
}
