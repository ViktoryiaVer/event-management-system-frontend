import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { EventModule } from './events/event.module';
import { initializeKeycloak } from 'src/utils/keycloak-init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, AccessDeniedComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    EventModule,
    AppRoutingModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
