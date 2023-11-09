import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'ems-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pageTitle = 'Event Management System';
  isLoggedIn!: boolean;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
  }

  doLogin() {
    this.authService.login();
  }

  doLogout() {
    this.authService.logout();
  }
}
