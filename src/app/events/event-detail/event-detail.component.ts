import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'ems-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;
  areParticipantsShown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEvent(id).subscribe({
      next: (event) => {
        this.event = event;
      },
    });
  }

  toggleParticipantsDisplay() {
    this.areParticipantsShown = !this.areParticipantsShown;
  }

  getEventCardToolTip() {
    return `Click to ${
      this.areParticipantsShown ? 'hide' : 'show'
    } participants `;
  }
}
