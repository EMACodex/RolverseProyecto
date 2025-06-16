import { Injectable } from '@angular/core';
import { RUTA_API } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { deleteForumResponse, ForumInterface, getForumResponse, getForumsResponse } from '../interfaces/forum.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiURL = `${RUTA_API}forum`;

  constructor(
    private http: HttpClient
  ) { }

  getAllForums(): Observable<getForumsResponse> {
    return this.http.get<getForumsResponse>(`${this.apiURL}/all`);
  }

  getForumById(id: number): Observable<getForumResponse>{
    return this.http.get<getForumResponse>(`${this.apiURL}/${id}`);
  }

  createForum(forumData: ForumInterface) {
    return this.http.post(`${this.apiURL}/new`, forumData);
  }

  updateForum(id: string, forumData: any) {
    return this.http.put(`${this.apiURL}/update/${id}`, forumData);
  }

  deleteForum(id: number): Observable<deleteForumResponse> {
    return this.http.delete<deleteForumResponse>(`${this.apiURL}/${id}`);
  }
}
