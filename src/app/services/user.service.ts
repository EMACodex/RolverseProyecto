import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RUTA_API } from '../../../environment';
import { personalUserResponse } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = `${RUTA_API}user`;

  constructor(
    private http: HttpClient,
  ) { }

  getUserById(id: number): Observable<personalUserResponse> {
    return this.http.get<personalUserResponse>(`${this.apiURL}/${id}`);
  }
}
