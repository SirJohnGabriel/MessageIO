import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  faGear,
  faPenToSquare,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../models/contact.models';
import { Message } from '../../../models/message.models';
import { conversationsService } from '../../services/conversationsService';
import { ConversationResponse } from '../../../models/conversation-response.models';
import { MessageServices } from '../../services/message-services';
import { SignalRService } from '../../services/signalr';

@Component({
  selector: 'app-conversations',
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './conversations.html',
  styleUrl: './conversations.css',
})
export class Conversations {
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private convoService: conversationsService,
    private messageService: MessageServices,
    private signalRService: SignalRService
  ) {}

  searchTerm: string = '';
  newMessage: string = '';
  currentUserName: string = '';
  selectedParticipantName: string = '';
  fagear = faGear;
  fapentosquare = faPenToSquare;
  faRightFromBracket = faRightFromBracket;
  showLogoutConfirm = false;
  conversations: ConversationResponse[] = [];
  currentUserId = '';
  messages: {
    id: number;
    contactId: number;
    text: string;
    timestamp: Date;
    sentByMe: boolean;
  }[] = [];
  selectedConversationId: number | null = null;

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnChanges() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll failed', err);
    }
  }

  settings() {
    this.router.navigate(['/settings']);
  }
  compose() {}

  performLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.showLogoutConfirm = false;
  }

  cancelLogout() {
    this.showLogoutConfirm = false;
  }

  ngOnInit(): void {
    this.currentUserId = this.getUserIdFromToken();
    this.currentUserName = this.getUserNameFromToken();
    this.signalRService.startConnection().then(() => {
      this.signalRService.onReceiveMessage((senderId, message) => {
        if (senderId === this.currentUserId) {
          return;
        }

        if (this.selectedConversationId) {
          this.messages.push({
            id: Date.now(),
            contactId: 0,
            text: message,
            timestamp: new Date(),
            sentByMe: false,
          });

          setTimeout(() => this.scrollToBottom(), 0);
        }
      });

      this.loadConversations();
    });
  }

  private loadConversations(): void {
    this.currentUserId = this.getUserIdFromToken();
    this.convoService.getUserConversations(this.currentUserId).subscribe({
      next: (data) => {
        this.conversations = data;

        if (this.conversations.length > 0) {
          const firstConvo = this.conversations[0];
          this.openConversation(firstConvo.conversationId);
        }
      },
      error: (err) => {
        console.error('Failed to load conversations:', err);
      },
    });
  }

  private getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || '';
    } catch (e) {
      console.error('Failed to decode token', e);
      return '';
    }
  }

  openConversation(conversationId: number) {
    if (this.selectedConversationId === conversationId) return;

    this.selectedConversationId = conversationId;
    this.signalRService.joinConversation(conversationId);

    const convo = this.conversations.find(
      (c) => c.conversationId === conversationId
    );
    if (convo) {
      this.selectedParticipantName = convo.participants
        .filter((p) => p.userId !== this.currentUserId)
        .map((p) => `${p.firstName} ${p.lastName ?? ''}`)
        .join(', ');
    }

    this.messageService.getMessage(conversationId).subscribe({
      next: (messages) => {
        this.messages = messages.map((msg) => ({
          id: msg.id,
          contactId: 0,
          text: msg.content,
          timestamp: new Date(msg.timeStamp),
          sentByMe: msg.senderId === this.currentUserId,
        }));

        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: (err) => {
        console.error('Failed to load messages:', err);
      },
    });
  }

  getParticipantNames(participants: any[]): string {
    return participants
      .filter((p) => p.userId !== this.currentUserId)
      .map((p) => `${p.firstName} ${p.lastName ?? ''}`)
      .join(', ');
  }

  sendMessage(): void {
    const trimmedContent = this.newMessage.trim();
    if (
      !trimmedContent ||
      !this.selectedConversationId ||
      !this.currentUserId
    ) {
      console.warn('Cannot send: empty message or missing conversation/user');
      return;
    }

    const payload = {
      senderId: this.currentUserId,
      conversationId: this.selectedConversationId,
      content: trimmedContent,
    };

    this.messageService.sendMessage(payload).subscribe({
      next: (response) => {
        // Add to local messages immediately
        this.messages.push({
          id: response.id,
          contactId: 0,
          text: response.content,
          timestamp: new Date(response.timeStamp),
          sentByMe: true,
        });

        this.newMessage = '';
        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: (err) => {
        console.error('Failed to send message:', err);
      },
    });
  }

  private getUserNameFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.firstName || '';
    } catch (err) {
      console.error('Failed to decode token for username', err);
      return '';
    }
  }

  get filteredConversations(): ConversationResponse[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.conversations;

    return this.conversations.filter((convo) => {
      const names = this.getParticipantNames(convo.participants).toLowerCase();
      return names.includes(term);
    });
  }
}
