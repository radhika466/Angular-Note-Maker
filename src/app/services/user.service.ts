import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface logoutStatus {
  success: boolean;
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return localStorage.getItem('loggedIn') || 'false';
  }

  logout() {
    return this.http.get<logoutStatus>('/assets/api/logout.json');
  }
}
