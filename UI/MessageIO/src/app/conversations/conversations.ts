import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversations',
  imports: [],
  templateUrl: './conversations.html',
  styleUrl: './conversations.css'
})
export class Conversations {
  http = inject(HttpClient);
  router = inject(Router);

  settings() {
    this.router.navigate(['/settings']);
  }
}
