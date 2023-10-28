import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centralizador',
  templateUrl: './centralizador.component.html',
  styleUrls: ['./centralizador.component.css']
})
export class CentralizadorComponent implements OnInit {

  idQueja: any;
  asignar: any;
  detalleQueja: any;
  user: any = null;
  isLoggedIn = false;
  ipUsuario: string;
  dataSourceEventos = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  eventoColumns: string[] = [
    'correlativo',
    'fechaHora',
    'accion'
  ];


  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
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
    });
    this.obtenerEventos();
    this.spinner.hide();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }

  obtenerEventos() {
    this.service.getData<any[]>(this.service.BASE_URL_CATALOGOS, 'queja/centralizador').toPromise().then(data => {
      console.log(data);
      this.dataSourceEventos.sort = this.sort;
      this.dataSourceEventos = new MatTableDataSource(data);
      this.dataSourceEventos.paginator = this.paginator;
    });
  }

  async obtenerQuejaById(id: number) {
    this.service.getData<any[]>(this.service.BASE_URL_CATALOGOS, `queja/byId/${id}`).toPromise().then(data => {
      this.detalleQueja = data;

    });
  }



  async asignacion() {
    //console.log('??',this.detalleQueja.codigoQueja);
    Swal.fire({
      showCloseButton: true,
      title: '¿Está seguro de asignar la queja?',
      text: 'Esta seguro de asignar la solicitud de queja',
      showDenyButton: true,
      denyButtonText: "Cancelar",
      confirmButtonText: "Aprobar",
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        /* await this.obtenerQuejaById(this.idQueja); */
        this.asignar = {
          solicitud: [this.detalleQueja.codigoQueja],
          complemento: 1
        };
        console.log(this.asignar);
        this.service.postData(this.service.BASE_URL_CATALOGOS, 'queja/asignar', this.asignar).toPromise().then(data => {
          Swal.fire({
            title: 'Asignada!',
            text: 'La queja ha sido asignada',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.obtenerEventos();
            this.detalleQueja = null;
          });
        });
      }
    })
  }

  async rechazar() {
    Swal.fire({
      showCloseButton: true,
      title: '¿Está seguro de rechazar la queja?',
      text: 'Esta seguro de rechazar la solicitud de queja',
      showDenyButton: true,
      denyButtonText: "Cancelar",
      confirmButtonText: "Rechazar",
      allowEscapeKey: false,
      allowOutsideClick: false, 
      input: 'text',
      inputPlaceholder: 'Ingrese el motivo de rechazo',
      inputValidator(validarJustifiacion){
        return !validarJustifiacion && 'Debe ingresar el motivo de rechazo'
      },
    }).then(async (validarJustifiacion) => {
      if (validarJustifiacion.isConfirmed) {
        const justificacion = validarJustifiacion.value;
        this.asignar = {
          solicitud: [this.detalleQueja.codigoQueja],
          complemento: 2,
          justificacion: justificacion
        };
        console.log(this.asignar);
        this.service.postData(this.service.BASE_URL_CATALOGOS, 'queja/asignar', this.asignar).toPromise().then(data => {
          Swal.fire({
            title: 'Rechazada!',
            text: 'La queja ha sido rechazada',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.obtenerEventos();
            this.detalleQueja = null;
          });
        });
      }
    })
  }
}
