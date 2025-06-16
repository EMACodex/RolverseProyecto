import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment.prod';
import {
  LoginCredentials,
  Response,
  RegisterCredentials,
  DecodedToken,
  tokenData,
} from '../interfaces/auth.interface';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient, private router: Router) {}

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
    this.router.navigate(['/']);
  }

  sendMailRecoversPass(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiURL}/sendrecover`, { email });
  }

  resetPass(token: string, password: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiURL}/recover`, {
      token,
      password,
    });
  }
  getCurrentUser(): DecodedToken | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode(token) as DecodedToken;
    } catch (e) {
      console.error('Error decodificando el token', e);
      return null;
    }
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();

    // Soporta ambos formatos: 'role' string o 'roles' array
    if (!user) return false;

    if ('roles' in user && Array.isArray(user.roles)) {
      return user.roles.includes('admin');
    }

    if ('role' in user && typeof user.role === 'string') {
      return user.role === 'admin';
    }

    return false;
  }

  getTokenData(): Observable<tokenData> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    try {
      const decodedToken = jwtDecode<tokenData>(token);
      return of(decodedToken);
    } catch (error) {
      console.error('Error decoding token:', error);
      return throwError(() => new Error('Invalid token'));
    }
  }
}
