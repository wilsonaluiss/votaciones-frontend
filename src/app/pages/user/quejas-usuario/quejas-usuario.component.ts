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

interface Ingreso {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quejas-usuario',
  templateUrl: './quejas-usuario.component.html',
  styleUrls: ['./quejas-usuario.component.css']
})
export class QuejasUsuarioComponent implements OnInit {

  numero: number;
  medio: any;
  sigl:any
  cadena: string;
  url: string;
  public file: File = null;
  documento: any;
  formData: any;
  strImage: any;
  anioActual = new Date().getFullYear();
  user: any = null;
  isLoggedIn = false;
  ipUsuario: string;
  quejas: any;
  listDepartamentos: any = [];
  ingresos: Ingreso[] = [
    { value: '1', viewValue: 'Telefono' },
    { value: '2', viewValue: 'Correo' },
    { value: '3', viewValue: 'Chat' },
    { value: '4', viewValue: 'Correo' },
    { value: '5', viewValue: 'Presencial' },
  ];
  cantidad: any;
  qms: any = [];
  dataSourceEventos = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  eventoColumns: string[] = [
    'id',
    'descripcion',
    'codigo'
  ];
  numerito: number;
  corr: any;
  QuejasForm: FormGroup;
  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
  ) {
    this.QuejasForm = new FormGroup({
      idCatalogo: new FormControl(''),
      codigo: new FormControl('', Validators.required),
      nombrePartido: new FormControl('', Validators.required),
      ideologia: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
    });
  }

  async ngOnInit() {
    this.spinner.show();
    //this.consultarDepartamentos();
    this.mostrarPartidos();
    //this.consultarMunicipios();
    this.spinner.hide();
  }

  /* consultarDepartamentos() {
    this.spinner.show();
    this.service.getData(this.service.BASE_URL_CATALOGOS, 'catalogos/findDepartamentos').toPromise().then(res => {
      this.listDepartamentos = res;
    });
    this.spinner.hide();
  } */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }

  guardarPartido(data: any) {
    this.spinner.show();
    this.service.postData(this.service.BASE_URL_CATALOGOS, 'catalogos/savePartido', this.QuejasForm.value).toPromise().then(data => {
      this.spinner.hide();
      Swal.fire({
        title: 'Partido Politico',
        text: 'Partido Politico guardado con exito',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.QuejasForm.reset();
      this.mostrarPartidos();
    }).catch(error => {
      this.spinner.hide();
      Swal.fire({
        title: 'Partido Politico',
        text: 'Error al guardar el Partido Politico',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
  
  mostrarPartidos() {
    this.spinner.show();
    this.service.getData(this.service.BASE_URL_CATALOGOS, 'catalogos/findPartidos').toPromise().then(res => {
      this.qms = res;
      console.log(this.qms);
      this.dataSourceEventos = new MatTableDataSource(this.qms);
      this.dataSourceEventos.paginator = this.paginator;
      this.dataSourceEventos.sort = this.sort;
      this.spinner.hide();
    });
  }

  
}