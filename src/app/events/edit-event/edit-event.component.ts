import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  submitted: boolean = false;
  event!: Event;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      theme: ['', Validators.required],
      durationInMinutes: ['', [Validators.required, Validators.min(1)]],
    });

    this.subscription = this.route.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.getEvent(id);
    });
  }

  get name() {
    return this.eventForm.controls['name'];
  }

  get description() {
    return this.eventForm.controls['description'];
  }

  get theme() {
    return this.eventForm.controls['theme'];
  }

  get durationInMinutes() {
    return this.eventForm.controls['durationInMinutes'];
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
    this.submitted = true;

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
    this.submitted = false;
    this.router.navigate(['/events']);
  }
}
