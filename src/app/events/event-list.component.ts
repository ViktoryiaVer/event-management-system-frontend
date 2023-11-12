import { Component, OnInit } from '@angular/core';
import { Event, EventListResolved } from './event.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ems-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  pageTitle: string = 'Events';
  events!: Event[];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const resolvedData: EventListResolved =
      this.route.snapshot.data['eventListResolved'];
    this.onEventRetrieved(resolvedData);
  }

  onEventRetrieved(resolvedData: EventListResolved): void {
    if (resolvedData.events) {
      this.events = resolvedData.events;
    } else if (resolvedData.error) {
      this.pageTitle = 'No events found';
      this.errorMessage = resolvedData.error;
    }
  }
}
