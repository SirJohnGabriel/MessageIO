import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7218/chathub')
      .withAutomaticReconnect()
      .build();

    return this.hubConnection.start().catch((err) => {
      console.error('SignalR connection error:', err);
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
