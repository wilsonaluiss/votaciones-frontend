import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public anadirUsuario(user:any){
    return this.httpClient.post(`${baserUrl}/save`,user);
  }
}
