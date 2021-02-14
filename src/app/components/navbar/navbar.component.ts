import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private user: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  signout() {
    this.user.logout().subscribe((data) => {
      if (data.success) {
        this.auth.setLoggedIn(false);
        this.router.navigate(['']);
      } else {
        window.alert('Some problem');
      }
    });
  }
}
