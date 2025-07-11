import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faGear, faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../models/contact.models';
import { Message } from '../../../models/message.models';

@Component({
  selector: 'app-conversations',
  imports: [ FontAwesomeModule, FormsModule, CommonModule ],
  templateUrl: './conversations.html',
  styleUrl: './conversations.css'
})
export class Conversations {  
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(private http: HttpClient, private router: Router) { }

  searchTerm: string = '';
  fagear = faGear;
  fapentosquare = faPenToSquare;
  faRightFromBracket = faRightFromBracket;
  showLogoutConfirm = false;

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
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll failed', err);
    }
  }

   messages: Message[] = [
    { id: 1, contactId: 1, text: 'Hi!', timestamp: new Date(), sentByMe: false },
    { id: 2, contactId: 1, text: 'Hello!', timestamp: new Date(), sentByMe: true },
    { id: 2, contactId: 1, text: 'How are you doing?', timestamp: new Date(), sentByMe: true },
    { id: 2, contactId: 1, text: 'Im fine, thanks. You?', timestamp: new Date(), sentByMe: false },
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: true },
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false },
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false },
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false },
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false },
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: true },
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false },
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: true }, 
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false }, 
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: true }, 
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false }, 
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false }, 
    { id: 2, contactId: 1, text: 'I love you!', timestamp: new Date(), sentByMe: false }, 
  ];

   contacts: Contact[] = [
    { id: 1, name: 'Alice Johnson', avatar: '...', lastMessage: 'Hey there!' },
    { id: 2, name: 'Bob Smith', avatar: '...', lastMessage: 'Sent the file.' },
    { id: 3, name: 'Jane Mylene', avatar: '...', lastMessage: 'Talaga ba?' },
    { id: 4, name: 'John Smith', avatar: '...', lastMessage: 'I\'m not Shadow! Oh, Hi Delta.' },
    { id: 5, name: 'Rimuru Tempest', avatar: '...', lastMessage: 'Where is my dragon!?' },
    { id: 6, name: 'Rudeus Greyrat', avatar: '...', lastMessage: 'I miss Sylphie' },
    { id: 7, name: 'Erza Scarlet', avatar: '...', lastMessage: 'Have you invited the lord to your heart?' },
    { id: 8, name: 'Naufomi Iwatani', avatar: '...', lastMessage: 'I have harem.' },
    { id: 9, name: 'Cid Kageno', avatar: '...', lastMessage: 'Im just a background character' },
    { id: 10, name: 'Raphtalia', avatar: '...', lastMessage: 'Where is Naufomi-san?' },
    { id: 11, name: 'Alpha', avatar: '...', lastMessage: 'Im the boss!' },
  ];

  settings() {
    this.router.navigate(['/settings']);
  }
  compose() { }
  
  performLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.showLogoutConfirm = false;
  }

  cancelLogout() {
    this.showLogoutConfirm = false;
  }
}
