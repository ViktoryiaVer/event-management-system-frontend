import { ActivatedRoute } from '@angular/router';
import { Event, Participant } from './../event.model';
import { Component, Input } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'ems-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css'],
})
export class ParticipantListComponent {
  @Input() participants!: Participant[];
  @Input() eventId!: string;
  event!: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventId = String(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEvent(this.eventId).subscribe({
      next: (event) => (this.event = event),
    });
  }

  deleteParticipant(participant: Participant): void {
    const eventToUpdate: Event = {
      ...this.event,
      participants: [
        ...this.event.participants.filter((p) => p.email !== participant.email),
      ],
    };

    this.eventService.updateEvent(eventToUpdate).subscribe({
      next: () => (this.participants = eventToUpdate.participants),
    });
  }
}
