import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = 'https://localhost:7218/api/user';

  constructor(private http: HttpClient) { }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { identifier, password });
  }

  register(user: { username: string; email: string; firstName: string; lastName: string; passwordHash: string; }):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }
}
