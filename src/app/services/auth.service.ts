import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RUTA_API } from '../../../environment';
import { LoginCredentials, Response, RegisterCredentials } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = `${RUTA_API}auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginCredentials): Observable<Response> {
    return this.http.post<Response>(`${this.apiURL}/login`, credentials);
  }

  register(credentials: RegisterCredentials): Observable<Response> {
    return this.http.post<Response>(`${this.apiURL}/register`, credentials);
  }

}
