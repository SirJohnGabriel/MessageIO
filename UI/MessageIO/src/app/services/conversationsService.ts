import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConversationResponse } from '../../models/conversation-response.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class conversationsService {
  private baseUrl = 'https://localhost:7218/api/Conversations';

  constructor(private http: HttpClient) {}

  getUserConversations(userId: string): Observable<ConversationResponse[]> {
    return this.http.get<ConversationResponse[]>(`${this.baseUrl}/${userId}`);
  }
}
