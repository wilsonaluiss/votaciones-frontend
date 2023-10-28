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
  tipCandidato: any = [];

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
    this.tipoCandidatos();
    this.spinner.hide();

  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }
 

  limpiarFormulario() {
    this.PatencionForm.reset();
  }

 
  tipoCandidatos(){
    this.spinner.show();
    this.service.getData(this.service.BASE_URL_VOTACIONES, 'catalogos/findTipoCandidatos').toPromise().then(res => {
      this.tipCandidato = res;
    });
    this.spinner.hide();
  }

  
}



