import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RUTA_API } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiURL = `${RUTA_API}message`;

  constructor(
    private http: HttpClient
  ) { }

  getAllMessages(forumId: number) {
    return this.http.get(`${this.apiURL}/all/${forumId}`);
  }

  getLastMessagesFromUser(userId: number) {
    return this.http.get(`${this.apiURL}/last/${userId}`);
  }

  createMessage(data: FormData) {
    console.log('Creating message with data:', data);
    return this.http.post(`${this.apiURL}/new`, data);
  }

}


