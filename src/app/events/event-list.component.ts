import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { EventService } from './event.service';

@Component({
  selector: 'ems-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  pageTitle: string = 'Events';
  events!: Event[];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
    });
  }
}
