import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from './usuario';
import { Registro } from './registro';
import { OAuthResponse } from './oauth-response';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API_LOGIN = `${environment.apiUrl}/login`;
  API_REGISTER = `${environment.apiUrl}/register`;

  constructor() { }

  logar(login: Login): Observable<string> {
    return this.http.post<OAuthResponse>(this.API_LOGIN, login)
      .pipe(
        map(response => response.access_token)
      );
  }

  registrar(registro: Registro): Observable<any> {
    return this.http.post<any>(this.API_REGISTER, registro, {responseType: 'text' as 'json'});
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.role == role)
      return true;
    else
      return false;
  }

}
