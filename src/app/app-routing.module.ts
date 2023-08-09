import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { EventListComponent } from './events/event-list.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEventComponent } from './events/create-event/create-event.component';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/new', component: CreateEventComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'events/:id/edit', component: EditEventComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  declarations: [WelcomeComponent, EventListComponent],
  imports: [RouterModule.forRoot(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
