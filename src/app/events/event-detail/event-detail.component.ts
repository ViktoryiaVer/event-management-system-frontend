import { Component, OnInit } from '@angular/core';
import { Event, EventResolved } from '../event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'ems-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  pageTitle: string = 'Event details';
  event!: Event;
  areParticipantsShown: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const resolvedData: EventResolved =
      this.route.snapshot.data['eventResolved'];
    this.onEventRetrieved(resolvedData);
  }

  onEventRetrieved(resolvedData: EventResolved): void {
    if (resolvedData.event) {
      this.event = resolvedData.event;
      this.pageTitle = `Event Details: ${this.event.name}`;
    } else if (resolvedData.error) {
      this.pageTitle = 'No event found';
      this.errorMessage = resolvedData.error;
    }
  }

  toggleParticipantsDisplay() {
    this.areParticipantsShown = !this.areParticipantsShown;
  }

  getEventCardToolTip() {
    return `Click to ${
      this.areParticipantsShown ? 'hide' : 'show'
    } participants `;
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.event.id).subscribe({
      next: () => this.router.navigate(['/events']),
    });
  }
}
