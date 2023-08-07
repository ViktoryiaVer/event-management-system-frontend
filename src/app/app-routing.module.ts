import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { EventsComponent } from './events/events.component';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './events/event-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  { path: 'home', component: WelcomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailComponent },
];

@NgModule({
  declarations: [WelcomeComponent, EventsComponent],
  imports: [RouterModule.forRoot(routes), CommonModule, FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
