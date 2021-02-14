import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private loggedInStatus = JSON.parse(
    localStorage.getItem('loggedIn') || 'false'
  );

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', value.toString());
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus);
  }

  getUserDetails(username, password) {
    if (username == 'admin' && password == 'admin') {
      // post these details to API server return user info if correct
      /* return this.http.post<myData>('assets/api/auth.json', {
         username,
         password,
      });*/
      return this.http.get<myData>('assets/api/authsuccess.json');
    } else {
      return this.http.get<myData>('assets/api/authError.json');
    }
  }
}
