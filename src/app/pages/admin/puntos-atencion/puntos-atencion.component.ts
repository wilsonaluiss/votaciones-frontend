import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';
import { map, startWith } from 'rxjs/operators';
declare let $: any;


@Component({
  selector: 'app-puntos-atencion',
  templateUrl: './puntos-atencion.component.html',
  styleUrls: ['./puntos-atencion.component.css']
})

export class PuntosAtencionComponent implements OnInit {


  row: any;
  eliminar: any;
  solicitud:any = [];
  cantidad: any;
  eliminacion: any;
  PatencionForm: FormGroup;
  estadoatencion: any;
  atencion: any;
  dataSourceEventos = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  eventoColumns: string[] = [
    'codigoAtencionId',
    'regionPatencion',
    'nombrePatencion',
    'accion'
  ];
  solicitudes: any;
  user: any = null;
  isLoggedIn = false;
  ipUsuario: string;
  regiones: any = [];
  detalleEvento: any;
  regionModifica: any;
  habilitarEdicion: boolean = true;
  region: any;

  estadoPatencion = new FormControl('');
  constructor(private service: ServiceService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,) {
    this.PatencionForm = new FormGroup({
      nombreAtencion: new FormControl('', Validators.required),
      regionAtencion: new FormControl('', Validators.required),
      estadoAtencion: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerRegion();

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
      console.log(res);
    })
    this.obtenerPuntosAtencion();
    this.spinner.hide();

  }


  obtenerPuntosAtencion() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'patencion/listar').toPromise().then(data => {
      this.atencion = data;
      this.estadoatencion = this.atencion.estado == 1 ? 'Activo' : 'Inactivo';
      this.dataSourceEventos = new MatTableDataSource(data);
      this.dataSourceEventos.paginator = this.paginator;
      this.dataSourceEventos.sort = this.sort;
      console.log(data);
      this.spinner.hide();
    });
  }

  obtenerRegion() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'catalogos/regiones').toPromise().then(data => {
      this.regiones = data;
      console.log(data);
      this.spinner.hide();
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }

  async guardarPuntoAtencion(data: any) {
    this.spinner.show();
    const guardarAtencion = {
      nombrePatencion: data.nombreAtencion,
      regionPatencion: data.regionAtencion,
      estado: 1,
      usuarioAgrega: this.user.username,
      ipUsuarioAgrega: this.ipUsuario,
      fechaAgrega: Number(moment()),
    }
    console.log(guardarAtencion)
    await this.service.postData(this.service.BASE_URL_VOTACIONES, 'patencion/crear', guardarAtencion).toPromise().then(data => {
      this.obtenerPuntosAtencion();
      this.spinner.hide();
      Swal.fire({
        titleText: `Se guardaron correctamente los datos del punto de
        atención`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false,
        position: 'top'
      });
      return data;
    }).catch(err => {
      console.error(err);
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


  obtenerDetalleEvento(id: number) {
    this.spinner.show();
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, `patencion/${id}`).toPromise().then(data => {
      this.detalleEvento = data;
      this.PatencionForm.get('nombreAtencion')?.setValue(this.detalleEvento.nombrePatencion);
      this.PatencionForm.get('regionAtencion')?.setValue(this.detalleEvento.regionPatencion);
      this.PatencionForm.get('estadoAtencion')?.setValue(this.detalleEvento.estado);
      this.detalleEvento.estado == 1 ? true : false;
      if (this.detalleEvento.regionPatencion == 1) {
        this.region = 'Región Central'
      } else if (this.detalleEvento.regionPatencion == 2) {
        this.region = 'Región Sur'
      } else if (this.detalleEvento.regionPatencion == 3) {
        this.region = 'Región Nororiente'
      } else if (this.detalleEvento.regionPatencion == 4) {
        this.region = 'Región Occidente'
      }
      //console.log('estado', this.detalleEvento.estado);
      console.log(data);
      this.spinner.hide();
    });
  }

  obtenerEstadoPatencion(event: any) {
    console.log('region1', this.detalleEvento.regionPatencion)
    let region = this.detalleEvento.codigoAtencionId;
    console.log('region2', this.region)
    console.log('region3', region)
    let estado = event.checked == true ? 1 : 2;
    console.log('estado', estado);
    if (estado == 2) {
      this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, `upatencion/cantidad/${region}`).toPromise().then(data => {
        this.eliminacion = data;
        this.cantidad = this.eliminacion.cantidad;
        console.log('eliminacion', this.cantidad);
        Swal.fire({
          title: 'Esta seguro de la eliminación?',
          text: `Se eliminará la cantidad de ${this.cantidad} usuario${this.cantidad != 1 ? "s" : ""} asociado${this.cantidad != 1 ? "s" : ""} a la ${this.region}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminar!',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, `upatencion/solicitud/${this.detalleEvento.codigoAtencionId}`).toPromise().then(data => {
              this.solicitudes = data;
              console.log(this.solicitudes);
              this.solicitudes.forEach((element: any) => {
                return this.solicitud.push(element?.codigoUsuarioPunto);
              });
              console.log('solicitud', this.solicitud.toString());
              const solicitudesEliminar = {
                pCodigo: this.solicitud
              }
              console.log('solicitudesEliminar', solicitudesEliminar);
               this.service.postData(this.service.BASE_URL_VOTACIONES, 'upatencion/estadosm', (solicitudesEliminar)).toPromise().then(data => {
              });
              this.spinner.hide();
            })
          }
        })
      });

    }
  }



  limpiarFormulario() {
    this.PatencionForm.reset();
  }

  modificarPatencion() {
    this.spinner.show();
    const modificarPatencion = {
      codigoAtencionId: this.detalleEvento.codigoAtencionId,
      nombrePatencion: this.PatencionForm.get('nombreAtencion')?.value,
      regionPatencion: this.PatencionForm.get('regionAtencion')?.value,
      estado: this.PatencionForm.get('estadoAtencion')?.value ? 1 : 2,
      usuarioAgrega: this.user.username,
      ipUsuarioAgrega: this.ipUsuario,
      fechaAgrega: Number(moment()),
    }
    console.log('modificar', modificarPatencion);
    this.service.postData(this.service.BASE_URL_VOTACIONES, 'patencion/modificar/pa', modificarPatencion).toPromise().then(data => {
      this.obtenerPuntosAtencion();
      this.spinner.hide();
      Swal.fire({
        titleText: `Datos actualizados`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false,
        position: 'top'
      });
      return data;
    }).catch(err => {
      console.error(err);
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


  esEmailValido(email: string): boolean {
    let mailValido = false;
    'use strict';

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(EMAIL_REGEX)) {
      mailValido = true;
    }
    return mailValido;
  }
}



