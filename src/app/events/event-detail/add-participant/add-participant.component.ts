import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';

@Component({
  selector: 'ems-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css'],
})
export class AddParticipantComponent implements OnInit {
  pageTitle: string = 'Add a participant to the event';
  participantForm!: FormGroup;
  submitted: boolean = false;
  eventId!: string;
  event!: Event;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  get firstName() {
    return this.participantForm.controls['firstName'];
  }

  get lastName() {
    return this.participantForm.controls['lastName'];
  }

  get email() {
    return this.participantForm.controls['email'];
  }

  ngOnInit(): void {
    this.eventId = String(this.route.snapshot.paramMap.get('id'));
    this.participantForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.eventService.getEvent(this.eventId).subscribe({
      next: (event) => (this.event = event),
    });
  }

  saveParticipant() {
    this.submitted = true;

    if (this.participantForm.valid) {
      if (this.participantForm.dirty) {
        const eventToUpdate = {
          ...this.event,
          participants: [
            ...this.event.participants,
            this.participantForm.value,
          ],
        };
        this.eventService.updateEvent(eventToUpdate).subscribe({
          next: () => this.onSaveComplete(),
        });
      }
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.participantForm.reset();
    this.submitted = false;
    this.router.navigate(['/events', this.eventId]);
  }
}
