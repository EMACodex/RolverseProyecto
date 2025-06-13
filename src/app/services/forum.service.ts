import { Injectable } from '@angular/core';
import { RUTA_API } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { ForumInterface, ForumResponse } from '../interfaces/forum.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiURL = `${RUTA_API}forum`;

  constructor(
    private http: HttpClient
  ) { }

  getAllForums() {
    return this.http.get(`${this.apiURL}/all`);
  }

  getForumById(id: string) {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  createForum(forumData: ForumInterface): Observable<ForumResponse> {
    return this.http.post<ForumResponse>(`${this.apiURL}/new`, forumData);
  }

  updateForum(id: string, forumData: any) {
    return this.http.put(`${this.apiURL}/update/${id}`, forumData);
  }

  deleteForum(id: string) {
    return this.http.delete(`${this.apiURL}/delete/${id}`);
  }
}
