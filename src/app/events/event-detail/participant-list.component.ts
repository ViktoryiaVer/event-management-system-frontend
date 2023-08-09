import { Component, Input } from '@angular/core';
import { Participant } from '../event.model';

@Component({
  selector: 'ems-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css'],
})
export class ParticipantListComponent {
  @Input() participants!: Participant[];
}
