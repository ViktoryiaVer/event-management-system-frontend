import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
