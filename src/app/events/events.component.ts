import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { EventService } from './event.service';

@Component({
  selector: 'ems-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
    });
  }
}
