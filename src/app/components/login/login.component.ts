import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private Auth: AuthService, private router: Router) {}
  username: string;
  password: string;

  ngOnInit(): void {}

  login() {
    event.preventDefault();
    const username = this.username;
    const password = this.password;

    this.Auth.getUserDetails(username, password).subscribe((data) => {
      if (data.success) {
        this.Auth.setLoggedIn(true);
        this.router.navigateByUrl('/home');
      } else {
        window.alert(data.message);
      }
    });
  }
}
