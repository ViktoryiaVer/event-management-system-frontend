import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';

@NgModule({
  declarations: [AppComponent, EventDetailComponent, EditEventComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
