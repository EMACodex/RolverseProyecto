import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RUTA_API } from '../../../environment';
import { LoginCredentials, Response, RegisterCredentials } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = `${RUTA_API}auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: LoginCredentials): Observable<Response> {
    return this.http.post<Response>(`${this.apiURL}/login`, credentials);
  }

  register(credentials: RegisterCredentials): Observable<Response> {
    return this.http.post<Response>(`${this.apiURL}/register`, credentials);
  }

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  sendMailRecoversPass(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiURL}/sendrecover`, { email });
  }

  resetPass(token: string, password: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiURL}/recover`, { token, password });
  }

}
