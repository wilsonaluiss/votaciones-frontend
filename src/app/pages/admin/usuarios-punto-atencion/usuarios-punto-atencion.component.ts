import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios-punto-atencion',
  templateUrl: './usuarios-punto-atencion.component.html',
  styleUrls: ['./usuarios-punto-atencion.component.css']
})
export class UsuariosPuntoAtencionComponent implements OnInit {

  cantidadPa: any;
  cargomodificar: any;
  estado: any;
  evaluarRegion: any;
  datocargo: any;
  user: any = null;
  cargoMostrar: any;
  upatencion: any;
  usuarioAtencionForm: FormGroup;
  atencion: any;
  region: any;
  dataSourceEventos = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  regiones: any = [];
  puntosAtencion: any = [];
  catcargos: any = [];
  patencionActivas: any = [];
  usuarioUpatencion: any = [];
  eventoColumns: string[] = [
    'regionPatencion',
    'dpiUsuario',
    'nombreUsuarioAtencion',
    'codigoCargo',
    'accion'
  ];
  isLoggedIn = false;
  ipUsuario: string;
  detalleUpatencion: any;

  
  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.usuarioAtencionForm = new FormGroup({
      region: new FormControl('', Validators.required),
      puntoAtencion: new FormControl('', Validators.required),
      dpi: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      cargo: new FormControl('', Validators.required),
      estadoUsuario: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerCargos();
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUser();
      }
    )
    this.service.getIp().toPromise().then((res: any) => {
      this.ipUsuario = res.ip;
      console.log('my ip' + this.ipUsuario);
    })
    this.obtenerUsuarioPuertoAtencion();
    this.obtenerRegion();
    this.obtenerPuntosAtencion();
    this.obtenerUsuarioPuntoAtencion();
    this.spinner.hide();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }

  obtenerUsuarioPuertoAtencion() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'upatencion/listar').toPromise().then(data => {
      this.upatencion = data;
      this.dataSourceEventos.sort = this.sort;
      this.dataSourceEventos = new MatTableDataSource(this.upatencion);
      this.dataSourceEventos.paginator = this.paginator;
    });
  }


  

  obtenerRegion() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'catalogos/regiones').toPromise().then(data => {
      this.regiones = data;
      console.log(data);
      this.spinner.hide();
    });
  }

  cancelar() {
    this.usuarioAtencionForm.reset();
  }

  obtenerPuntosAtencion() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'patencion/listar').toPromise().then(data => {
      this.puntosAtencion = data;
      this.spinner.hide();
    });
  }

  obtenerUsuarioPuntoAtencion() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'upatencion/listar').toPromise().then(data => {
      this.usuarioUpatencion = data;
      this.spinner.hide();
    });
  }


  obtenerCargos() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'catalogos/cargo').toPromise().then(data => {
      this.catcargos = data;
      this.spinner.hide();
    });
  }

  validarDpi() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, `upatencion/validar/dpi/${this.usuarioAtencionForm.value.dpi}`).toPromise().then(data => {
      console.log('dpi', this.usuarioAtencionForm.value.dpi)
      this.atencion = data;
      console.log(this.atencion);
      if (this.atencion == true) {
        this.usuarioAtencionForm.get('dpi')?.setValue('');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El DPI ya se encuentra registrado!',
        });
      }
    });
  }

  guardarUsuarioAtencion(data: any) {
    this.spinner.show();
    const guardarAtencion = {
      nombreUsuarioAtencion: data.nombre,
      regionPatencion: data.region,
      codigoEstado: 1,
      codigoPuntoAtencion: data.puntoAtencion,
      dpiUsuario: data.dpi,
      codigoCargo: data.cargo,
      correoElectronico: data.correo,
      usuarioAgrega: this.user.username,
      ipUsuarioAgrega: this.ipUsuario,
      fechaAgrega: Number(moment()),
    };
    const user = {
      username: data.nombre,
      password: '123456',
      nombre: data.nombre,
      apellido: '',
      email: data.correo,
      telefono: '',
      enabled: true,
      tipo_usuario: data.cargo == 6 ? 4 : data.cargo == 5 ? 3 : data.cargo == 4 ? 7 : 0,
    }
    console.log('user', user)
    console.log('upatencion', guardarAtencion)
    this.service.postData(this.service.BASE_URL_VOTACIONES, 'upatencion/crear', guardarAtencion).toPromise().then(data => {
      this.atencion = data;
      this.userService.anadirUsuario(user).subscribe(
      )
      this.spinner.hide();
      console.log(this.atencion);
      Swal.fire({
        titleText: `Su solicitud se ha creado con éxito`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false,
        position: 'top'
      });
      this.obtenerUsuarioPuertoAtencion();
      this.usuarioAtencionForm.reset();
    }).catch(error => {
      console.error(error);
      this.spinner.hide();
      Swal.fire({
        titleText: 'Se ha producido un error y no es posible almacenar información, por favor intente más tarde',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false,
        position: 'top'
      });
    });
  }



  obtenerRgion() {
    this.evaluarRegion = this.usuarioAtencionForm.get('region')?.value
  }

  obtenerPuntoAtencion() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, `patencion/activa/${this.evaluarRegion}`).toPromise().then(data => {
      this.patencionActivas = data;
    });
  }

  obtenerDetalleUpatencion(id: any) {
    this.spinner.show();
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, `upatencion/detalle/${id}`).toPromise().then(data => {
      this.detalleUpatencion = data;
      this.usuarioAtencionForm.get('nombre')?.setValue(this.detalleUpatencion.nombreUsuarioAtencion);
      this.usuarioAtencionForm.get('dpi')?.setValue(this.detalleUpatencion.dpiUsuario);
      this.usuarioAtencionForm.get('correo')?.setValue(this.detalleUpatencion.correoElectronico);
      this.usuarioAtencionForm.get('cargo')?.setValue(this.detalleUpatencion.codigoCargo);
      this.usuarioAtencionForm.get('region')?.setValue(this.detalleUpatencion.regionPatencion);
      this.usuarioAtencionForm.get('puntoAtencion')?.setValue(this.detalleUpatencion.codigoPuntoAtencion);
      this.usuarioAtencionForm.get('estadoUsuario')?.setValue(this.detalleUpatencion.codigoEstado);
      if (this.detalleUpatencion.regionPatencion == 1) {
        this.region = 'Región Central'
      } else if (this.detalleUpatencion.regionPatencion == 2) {
        this.region = 'Región Sur'
      } else if (this.detalleUpatencion.regionPatencion == 3) {
        this.region = 'Región Nororiente'
      } else if (this.detalleUpatencion.regionPatencion == 4) {
        this.region = 'Región Occidente'
      }

      this.spinner.hide();
    });
  }

  validarEstado(event: any) {
    let estado = event.target.value;
  }

  obtenerCargo() {
    this.datocargo = this.usuarioAtencionForm.get('cargo')?.value;
    console.log('cargo', this.datocargo);
  }

  consultarCantidadPa() {
    this.spinner.show();
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, `patencion/cantidad/${this.usuarioAtencionForm.value.puntoAtencion}`).toPromise().then(data => {
      this.cantidadPa = data;
      if (this.cantidadPa == 0) {
        this.usuarioAtencionForm.get('puntoAtencion')?.setValue('');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El punto de atención no tiene usuarios asignados!',
        });
      }
      this.spinner.hide();
    });
    this.spinner.hide();
  }

  actualizarUsuarioAtencion() {
    this.spinner.show();
    this.usuarioAtencionForm.get('cargo')?.updateValueAndValidity();
    const actualizarUpatencion = {
      codigoUsuarioPunto: this.detalleUpatencion.codigoUsuarioPunto,
      codigoCargo: this.usuarioAtencionForm.get('cargo')?.value,
      nombreUsuarioAtencion: this.detalleUpatencion.nombreUsuarioAtencion,
      regionPatencion: this.detalleUpatencion.regionPatencion,
      codigoEstado: this.usuarioAtencionForm.get('estadoUsuario')?.value ? 1 : 2,
      codigoPuntoAtencion: this.detalleUpatencion.codigoPuntoAtencion,
      dpiUsuario: this.detalleUpatencion.dpiUsuario,
      correoElectronico: this.detalleUpatencion.correoElectronico,
      usuarioAgrega: this.user.username,
      ipUsuarioAgrega: this.ipUsuario,
      fechaAgrega: Number(moment()),
      fechaModifica: Number(moment()),
    }
    console.log('actualizar', actualizarUpatencion)
    this.service.postData(this.service.BASE_URL_VOTACIONES, 'upatencion/modificar/upa', actualizarUpatencion).toPromise().then(data => {
      this.atencion = data;
      this.cancelar();
      this.spinner.hide();
      console.log(this.atencion);
      Swal.fire({
        titleText: `Su solicitud se ha actualizado con éxito`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false,
        position: 'top'
      });
      this.obtenerUsuarioPuertoAtencion();
      this.usuarioAtencionForm.reset();
    }).catch(error => {
      console.error(error);
      this.spinner.hide();
      Swal.fire({
        titleText: 'Se ha producido un error y no es posible almacenar información, por favor intente más tarde',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false,
        position: 'top'
      });
    });
  }
}