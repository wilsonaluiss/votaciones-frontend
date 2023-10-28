import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  BASE_URL_VOTACIONES = environment.BASE_URL_VOTACIONES;
  BASE_URL_CATALOGOS = environment.BASE_URL_CATALOGOS;
  BASE_URL_VOTO = environment.BASE_URL_VOTO;


  rolLogueado: any;

  constructor(private http: HttpClient) { }

  /**
        * Metodo que realiza un get a un microservicio haciendo uso de un solo parametro 
        * enviando el valor en la url ejemplo http://host.microservicio/metodoGet/parametro
        * @param pUrl url del microservicio ejemplo http://host.microservicio/metodoGet
        * @param pNombreServicio nombre del servicio a llamar. Puede ser null
        * @param pParametro parametro que se envia al servicio este puede ser null si no se envia parametro
        */
  public getData<T>(pUrl: string, pNombreServicio: string | null, pParametro: string | null = null, pJSON: boolean = false): Observable<T> {
    if (pNombreServicio == null) {
      if (pParametro === null) {
        return this.http.get<T>(`${pUrl}`, this.generateHeaders(pJSON));
      } else {
        return this.http.get<T>(`${pUrl}/${pParametro}`, this.generateHeaders(pJSON));
      }
    } else {
      if (pParametro === null) {
        return this.http.get<T>(`${pUrl}/${pNombreServicio}`, this.generateHeaders(pJSON));
      } else {
        return this.http.get<T>(`${pUrl}/${pNombreServicio}/${pParametro}`, this.generateHeaders(pJSON));
      }
    }
  }

  public generateHeaders(json: boolean = false): object {
    let headers: HttpHeaders;
    if (json) {
      headers = new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json'
      });
    } else {
      headers = new HttpHeaders({
        'Accept': '*/*'
      });
    }
    //console.log('header a enviar:', JSON.stringify(headers));
    let httpOptions: object = { "headers": headers };
    return httpOptions;
  }

  public postData(pUrl: string, pNombreServicio: string | null, pBody: Object, pJSON: boolean = true): Observable<any> {
    if (pNombreServicio === null) {
      return this.http.post(pUrl, pBody, this.generateHeaders(pJSON));
    } else {
      return this.http.post(`${pUrl}/${pNombreServicio}`, pBody, this.generateHeaders(pJSON));
    }
  }

  public putData<T>(pUrl: string, pParametro: string, pBody: T): Observable<any> {
    let body = null;
    if (pBody)
      body = JSON.stringify(pBody);

    if (pParametro === null) {
      return this.http.put(`${pUrl}`, body, this.generateHeaders(true));
    }
    else {
      return this.http.put(`${pUrl}/${pParametro}`, body, this.generateHeaders(true));
    }
  }

  getIp() {
    return this.http.get('https://ipapi.co/json')
  }
}
