import { KeycloakService, KeycloakEventType } from 'keycloak-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {
    this.keycloak.keycloakEvents$.subscribe({
      next(event) {
        if (event.type === KeycloakEventType.OnTokenExpired) {
          keycloak.updateToken(20);
        }
      },
    });
  }

  getUsername(): string {
    return this.keycloak.getUsername();
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak
      .logout(window.location.origin + '/home')
      .then(() => this.keycloak.clearToken());
  }

  isLoggedIn() {
    return this.keycloak.isLoggedIn();
  }
}
