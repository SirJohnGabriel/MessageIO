import { Component } from '@angular/core';
import { ConversationResponse } from '../../../models/conversation-response.models';
import { CommonModule } from '@angular/common';
import { conversationsService } from '../../services/conversationsService';

@Component({
  selector: 'app-conversation-table',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './conversation-table.html',
  styleUrl: './conversation-table.css'
})
export class ConversationTable {
  conversations: ConversationResponse[] = [];
  errorMessage = '';
  currentUserId = 'a2d6edbc-3bb1-4f20-958e-35ff77b2eacb'; // or get from localStorage if needed

  constructor(private convoService: conversationsService) {}

  ngOnInit(): void {
    this.getConversations();
  }

  private getConversations(): void {
    this.convoService.getUserConversations(this.currentUserId).subscribe({
      next: (data) => {
        console.log('✅ Conversations fetched from service:', data);
        this.conversations = data;
      },
      error: (err) => {
        console.error('❌ Error fetching conversations from service:', err);
        this.errorMessage = 'Failed to load conversations.';
      }
    });
  }
}
