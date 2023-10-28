import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReglasNegocioService {

  constructor() { }


  /* Metodo para validar numeros 
  @e evento ejecutado desde la vista */
  public soloNumeros(e) {
    const key: any = e.keyCode || e.which;
    const teclado: any = String.fromCharCode(key);
    const especiales: any = '8';
    const numero: any = '0123456789';
    let teclado_especial: boolean = false;

    for (const i in especiales) {
      if (key === especiales[i]) {
        teclado_especial = true;
      }
    }
    if (numero.indexOf(teclado) === -1 && !teclado_especial) {
      return false;
    }
  }
}
