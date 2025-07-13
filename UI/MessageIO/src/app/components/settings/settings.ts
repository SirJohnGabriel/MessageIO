import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  http = inject(HttpClient);
  router = inject(Router);
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserId');
    this.router.navigate(['/login']);
  }
   return() {
    this.router.navigate(['/conversations']);
  }
}
