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
    private messageService: MessageServices
  ) {}

  searchTerm: string = '';
  newMessage: string = '';
  newMessageText: string = '';
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
    this.loadConversations();
  }

  private loadConversations(): void {
    this.currentUserId = this.getUserIdFromToken();
    this.convoService.getUserConversations(this.currentUserId).subscribe({
      next: (data) => {
        console.log('✅ Conversations loaded:', data);
        this.conversations = data;
      },
      error: (err) => {
        console.error('❌ Failed to load conversations:', err);
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
      console.error('❌ Failed to decode token', e);
      return '';
    }
  }

  openConversation(conversationId: number) {
    this.selectedConversationId = conversationId;

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
        console.error('❌ Failed to load messages:', err);
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
    const trimmedContent = this.newMessageText.trim();

    if (
      !trimmedContent ||
      !this.selectedConversationId ||
      !this.currentUserId
    ) {
      console.warn(
        '⚠️ Cannot send: empty message or missing conversation/user'
      );
      return;
    }

    const payload = {
      senderId: this.currentUserId,
      conversationId: this.selectedConversationId,
      content: trimmedContent,
    };

    console.log('📨 Sending message:', payload);

    this.messageService.sendMessage(payload).subscribe({
      next: (response) => {
        console.log('✅ Message sent:', response);

        // Add to local messages immediately
        this.messages.push({
          id: response.id,
          contactId: 0,
          text: response.content,
          timestamp: new Date(response.timeStamp),
          sentByMe: true,
        });

        this.newMessageText = '';
        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: (err) => {
        console.error('❌ Failed to send message:', err);
      },
    });
  }
}
