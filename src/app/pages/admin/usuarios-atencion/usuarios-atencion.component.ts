import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-atencion',
  templateUrl: './usuarios-atencion.component.html',
  styleUrls: ['./usuarios-atencion.component.css']
})
export class UsuariosAtencionComponent implements OnInit {

  regiones: any = [];

  constructor(private service: ServiceService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerRegion();
    this.spinner.hide();
  }


  obtenerRegion() {
    this.service.getData<any[]>(this.service.BASE_URL_VOTACIONES, 'catalogos/regiones').toPromise().then(data => {
      this.regiones = data;
      console.log(data);
    });
  }

}
