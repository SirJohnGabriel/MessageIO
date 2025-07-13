import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.models';

@Injectable({
  providedIn: 'root',
})
export class MessageServices {
  private baseUrl = 'https://localhost:7218/api/Messages';
  constructor(private http: HttpClient) {}

  getMessage(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/${conversationId}`);
  }

  sendMessage(payload: {
    senderId: string;
    conversationId: number;
    content: string;
  }): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }
}
