import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment.prod';
import { personalUserResponse } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = `${environment.apiUrl}user`;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<personalUserResponse> {
    return this.http.get<personalUserResponse>(`${this.apiURL}/${id}`);
  }
}
