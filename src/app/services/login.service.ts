import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //generar el token
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/login`, loginData);
  }

  //Iniciar sesión y establecer el token en el localStorage
  public login(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //cerrar sesión y eliminar el token del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtener el token del localStorage
  public getToken() {
    return localStorage.getItem('token');
  }

  //obtener el usuario del localStorage
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
    
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRol() {
    let user = this.getUser();
    console.log('user',user);
    
    return user.rol;
  }


  /* public getCurrentUser() {
    return this.http.get(`${baserUrl}/login`);
  } */
}
