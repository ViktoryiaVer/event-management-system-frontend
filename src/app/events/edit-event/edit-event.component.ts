import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ems-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  pageTitle: string = 'Edit an event';
  eventForm!: FormGroup;
  subscription!: Subscription;
  event!: Event;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: '',
      description: '',
      theme: '',
      durationInMinutes: '',
    });

    this.subscription = this.route.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.getEvent(id);
    });
  }

  getEvent(id: string): void {
    this.eventService.getEvent(id).subscribe({
      next: (event: Event) => this.populateEventFormData(event),
    });
  }

  populateEventFormData(event: Event): void {
    if (this.eventForm) {
      this.eventForm.reset();
    }
    this.event = event;

    this.eventForm.setValue({
      name: this.event.name,
      description: this.event.description,
      theme: this.event.theme,
      durationInMinutes: this.event.durationInMinutes,
    });
  }

  updateEvent(): void {
    if (this.eventForm.valid) {
      if (this.eventForm.dirty) {
        const eventToUpdate = { ...this.event, ...this.eventForm.value };

        this.eventService.updateEvent(eventToUpdate).subscribe({
          next: () => this.onUpdateComplete(),
        });
      } else {
        this.onUpdateComplete();
      }
    }
  }

  onUpdateComplete(): void {
    this.eventForm.reset();
    this.router.navigate(['/events']);
  }
}
