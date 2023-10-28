import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
  },
};

interface option {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})


export class ConsultaUsuarioComponent implements OnInit {


  showFilter: boolean = true;
  showInfo: boolean;
  anio2: any;
  qms: any[] = [];
  candidatos: any = [];
  partidos: any = [];
  tipCandidato: any = [];
  listDepartamentos: any = [];
  listMuniDepartamento: any = [];
  dataSourceEventos = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  eventoColumns: string[] = [
    'id',
    'codigo',
    'descripcion'
  ];
  candidatoForm: FormGroup;
  constructor(
    private servicios: ServiceService,
    private spinner: NgxSpinnerService,
  ) {
    this.candidatoForm = new FormGroup({
      idCatalogo: new FormControl(''),
      idTipoCandidato: new FormControl(''),
      idPartido: new FormControl('', Validators.required),
      idDepartamento: new FormControl('', Validators.required),
      idMunicipio: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      ideologia: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
    this.spinner.show();
    this.consultarDepartamentos();
    this.obtenerCandidatos();
    this.obtenerPartidos();
    this.tipoCandidato();
    this.spinner.hide();
  }

  consultarDepartamentos() {
    this.spinner.show();
    this.servicios.getData(this.servicios.BASE_URL_CATALOGOS, 'catalogos/findDepartamentos').toPromise().then(res => {
      this.listDepartamentos = res;
      console.log("ID del departamento seleccionado:", this.candidatoForm.value.idDepartamento);
      //console.log("ID del departamento seleccionado:", this.user.departamento);
    });
    this.spinner.hide();
  }
 
  async consultarMunicipios(codigo: any) {
    this.spinner.show();
    try {
      const res = await this.servicios.getData(this.servicios.BASE_URL_CATALOGOS, `catalogos/findMunicipiosByDepartemento/${this.candidatoForm.value.idDepartamento}`).toPromise();
      this.listMuniDepartamento = res;
      console.log(this.listMuniDepartamento);
    } catch (error) {
      console.log(error);
    } finally {
      this.spinner.hide();
    }
  }

  
  obtenerCandidatos() {
    this.spinner.show();
    this.servicios.getData(this.servicios.BASE_URL_CATALOGOS, 'catalogos/findTiposCandidatos').toPromise().then(res => {
      this.candidatos = res;
      this.dataSourceEventos = new MatTableDataSource(this.candidatos);
      this.dataSourceEventos.paginator = this.paginator;
      this.dataSourceEventos.sort = this.sort;
    });
    this.spinner.hide();
  }
  

  async obtenerPartidos() {
    this.spinner.show();
    try {
      const partido = await this.servicios.getData(this.servicios.BASE_URL_CATALOGOS, 'catalogos/findPartidos').toPromise();
      this.partidos = partido;
    } catch (error) {
      console.log(error);
    } finally {
      this.spinner.hide();
    }
    this.spinner.hide();
  }

  tipoCandidato(){
    this.spinner.show();
    this.servicios.getData(this.servicios.BASE_URL_CATALOGOS, 'catalogos/findTiposCandidatos').toPromise().then(res => {
      this.tipCandidato = res;
      console.log(this.tipCandidato);
    });
    this.spinner.hide();
  }

  guardarCandidato(data: any) {
    this.spinner.show();
    this.servicios.postData(this.servicios.BASE_URL_CATALOGOS, 'catalogos/saveCandidato', this.candidatoForm.value).toPromise().then(data => {
      this.spinner.hide();
      Swal.fire({
        title: 'Candidato',
        text: 'Candidato guardado con exito',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.candidatoForm.reset();
      this.obtenerCandidatos();
    }).catch(error => {
      this.spinner.hide();
      Swal.fire({
        title: 'Candidato',
        text: 'Error al guardar el Candidato',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
}
