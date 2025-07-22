import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(private router: Router) {}
  private hubConnection!: signalR.HubConnection;

  startConnection(): Promise<void> {
    const token = localStorage.getItem('token');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7218/chathub', {
        accessTokenFactory: () => token || '',
      })
      .withAutomaticReconnect()
      .build();

    return this.hubConnection.start().catch((err) => {
      console.error('SignalR connection error:', err);

      const isUnauthorized =
        err?.status === 401 || err?.message?.includes('401');

      if (isUnauthorized) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  joinConversation(conversationId: number): void {
    this.hubConnection
      .invoke('JoinConversation', conversationId.toString())
      .catch((err) => console.error('Join Conversation Error:', err));
  }

  leaveConversation(conversationId: number): void {
    this.hubConnection
      .invoke('LeaveConversation', conversationId.toString())
      .catch((err) => console.error('Leave Conversation error:', err));
  }

  onReceiveMessage(
    callback: (senderId: string, message: string) => void
  ): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  stopConnection(): void {
    this.hubConnection.stop();
  }
}
