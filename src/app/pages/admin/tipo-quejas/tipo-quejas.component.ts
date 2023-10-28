import { HttpClient } from '@angular/common/http';
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

@Component({
  selector: 'app-tipo-quejas',
  templateUrl: './tipo-quejas.component.html',
  styleUrls: ['./tipo-quejas.component.css']
})
export class TipoQuejasComponent implements OnInit {

  detalleQueja: any;
  isLoggedIn = false;
  ipUsuario: string;
  user: any = null;
  maskconfig: any;
  codigo: any;
  listaTipoQuejas: any;
  dataSourceEventos = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  quejasForm: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  eventoColumns: string[] = [
    'codigoTipoQueja',
    'siglas',
    'descripcionTipoQueja',
    'accion'
  ];

  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private http: HttpClient
  ) {
    this.quejasForm = new FormGroup({
      siglasQueja: new FormControl('', Validators.required),
      descripcionQueja: new FormControl('', Validators.required),
      estadoQueja: new FormControl(''),
    });
    this.maskconfig = {
      mask: [/\D/, /\D/, /\D/],
      placeholderChar: '\u2000',
      guide: false,
      keepCharPositions: false
    }
  }

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
      console.log(res);
    })
    this.obtenerTipoQuejas();
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
    this.quejasForm.reset();
  }

  obtenerTipoQuejas() {
    this.spinner.show();
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'tipoQueja/listar').toPromise().then(data => {
      this.listaTipoQuejas = data;
      this.codigo = this.listaTipoQuejas.codigoTipoQueja
      console.log('wut', this.listaTipoQuejas.codigoEstado);
      this.dataSourceEventos = new MatTableDataSource(data);
      this.dataSourceEventos.paginator = this.paginator;
      this.dataSourceEventos.sort = this.sort;
      console.log(this.listaTipoQuejas);
      this.spinner.hide();
    });
  }

  guardarTipoQueja(data: any) {
    this.spinner.show();
    const queja = {
      codigoEstado: 1,
      descripcionTipoQueja: data.descripcionQueja,
      siglas: data.siglasQueja,
      usuarioAgrega: this.user.username,
      ipUsuarioAgrega: this.ipUsuario,
      fechaAgrega: Number(moment()),
    }
    console.log('queja', queja)
    this.service.postData(this.service.BASE_URL_VOTACIONES, 'tipoQueja/crear', queja).toPromise().then(data => {
      this.spinner.hide();
      this.obtenerTipoQuejas();
      this.quejasForm.reset();
      Swal.fire({
        titleText: `Su solicitud se ha creado con éxito`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false,
        position: 'top'
      });
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

  obtenerDetalleTipoQueja(id: Number) {
    this.spinner.show();
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, `tipoQueja/${id}`).toPromise().then(data => {
      this.detalleQueja = data;
      console.log(this.detalleQueja);
      this.quejasForm.get('descripcionQueja')?.setValue(this.detalleQueja.descripcionTipoQueja);
      this.quejasForm.get('estadoQueja')?.setValue(this.detalleQueja.codigoEstado);
      this.spinner.hide();
    });
  }

  actualizarTipoQueja() {
    this.spinner.show();
    const queja = {
      codigoTipoQueja: this.detalleQueja.codigoTipoQueja,
      codigoEstado: this.quejasForm.get('estadoQueja')?.value ? 1 : 2,
      descripcionTipoQueja: this.quejasForm.get('descripcionQueja')?.value,
      siglas: this.detalleQueja.siglas,
      usuarioModifica: this.user.username,
      ipUsuarioModifica: this.ipUsuario,
      fechaModifica: Number(moment()),
      fechaAgrega: Number(moment()),
    }
    console.log('queja', queja)
    this.service.postData(this.service.BASE_URL_VOTACIONES, 'tipoQueja/modificar/queja', queja).toPromise().then(data => {
      this.spinner.hide();
      this.obtenerTipoQuejas();
      this.quejasForm.reset();
      Swal.fire({
        titleText: `Su solicitud se ha modificado con éxito`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false,
        position: 'top'
      });
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

}

