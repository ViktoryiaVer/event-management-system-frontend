import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { ParticipantListComponent } from './events/event-detail/participant-list.component';
import { CreateEventComponent } from './events/create-event/create-event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventDetailComponent,
    EditEventComponent,
    ParticipantListComponent,
    CreateEventComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
