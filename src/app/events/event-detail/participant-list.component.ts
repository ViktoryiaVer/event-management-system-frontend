import { ActivatedRoute } from '@angular/router';
import { Participant } from './../event.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ems-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css'],
})
export class ParticipantListComponent {
  @Input() participants!: Participant[];
  @Input() eventId!: string;
  @Output() deleteParticipantEvent = new EventEmitter<Participant>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventId = String(this.route.snapshot.paramMap.get('id'));
  }

  deleteParticipant(participant: Participant): void {
    this.deleteParticipantEvent.emit(participant);
  }
}
