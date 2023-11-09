import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ParticipantListComponent } from './event-detail/participant-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { AddParticipantComponent } from './event-detail/add-participant/add-participant.component';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list.component';
import { EventResolver } from './event-resolver.service';
import { EventListResolver } from './event-list-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'events',
    component: EventListComponent,
    resolve: { eventListResolved: EventListResolver },
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'events/new',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },

  {
    path: 'events/:id',
    component: EventDetailComponent,
    resolve: { eventResolved: EventResolver },
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'events/:id/edit',
    component: EditEventComponent,
    resolve: { eventResolved: EventResolver },
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'events/:id/edit/participants',
    component: AddParticipantComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    EventListComponent,
    EventDetailComponent,
    EditEventComponent,
    ParticipantListComponent,
    CreateEventComponent,
    AddParticipantComponent,
  ],
})
export class EventModule {}
