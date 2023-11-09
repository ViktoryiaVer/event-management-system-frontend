import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(router: Router, private keycloak: KeycloakService) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const requiredRoles = route.data['roles'];

    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    if (requiredRoles.some((role) => this.roles.includes(role))) {
      return true;
    }

    this.router.navigate(['access-denied']);
    return false;
  }
}
