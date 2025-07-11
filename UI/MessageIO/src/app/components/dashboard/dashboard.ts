import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/user.models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  http = inject(HttpClient);
  router = inject(Router);

  users$ = this.getUsers();

  private getUsers(): Observable<User[]>{
    return this.http.get<User[]>('https://localhost:7218/api/user')
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
