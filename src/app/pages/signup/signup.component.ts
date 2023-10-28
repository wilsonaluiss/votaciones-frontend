import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface Tusuario {
  value: Number;
  viewValue: string;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  tusuarios: Tusuario[] = [
    {value: 5, viewValue: 'USUARIO'},
    {value: 6, viewValue: 'CUENTAHABIENTE'},
  ];

  listDepartamentos: any = [];
  listMuniDepartamento: any = [];
  codigoDepartamento: any;

  public user = {
    dpi: '',
    nombre : '',
    apellido : '',
    departamento : '',
    municipio : '',
    usuario : '',
    password : '',
    rol: '',
    fechaAdicion: new Date()
  }

  constructor(private userService: UserService, private snack:MatSnackBar, private servicios: ServiceService,private spinner: NgxSpinnerService,) { }

  async ngOnInit() {
    this.spinner.show();
    this.consultarDepartamentos();
    //this.consultarMunicipios();
    this.spinner.hide();
  }

  consultarDepartamentos() {
    this.spinner.show();
    this.servicios.getData(this.servicios.BASE_URL_CATALOGOS, 'catalogos/findDepartamentos').toPromise().then(res => {
      this.listDepartamentos = res;
      console.log("ID del departamento seleccionado:", this.user.departamento);
    });
    this.spinner.hide();
  }

  async consultarMunicipios(codigo: any) {
    this.spinner.show();
    try {
      const res = await this.servicios.getData(this.servicios.BASE_URL_CATALOGOS, `catalogos/findMunicipiosByDepartemento/${this.user.departamento}`).toPromise();
      this.listMuniDepartamento = res;
      console.log(this.listMuniDepartamento);
    } catch (error) {
      console.log(error);
    } finally {
      this.spinner.hide();
    }
  }
  
  

  formSubmit(){
    console.log(this.user);
    if(this.user.usuario == '' || this.user.usuario == null){
      this.snack.open('El nombre de usuario es obligatorio !!', 'Aceptar',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.anadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
        this.user = {
          dpi: '',
          nombre: '',
          apellido: '',
          departamento: '',
          municipio: '',
          usuario: '',
          password: '',
          rol: '',
          fechaAdicion: new Date()
        };
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar',
      {
        duration: 3000
      });
      }
    )
  }


  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
  

  


  
}
