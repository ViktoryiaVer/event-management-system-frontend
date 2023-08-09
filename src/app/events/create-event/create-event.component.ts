import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ems-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  pageTitle: string = 'Create an event';
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: '',
      description: '',
      theme: '',
      durationInMinutes: '',
    });
  }

  saveEvent() {
    this.eventService.saveEvent(this.eventForm.value).subscribe({
      next: () => this.onSaveComplete(),
    });
  }

  onSaveComplete(): void {
    this.eventForm.reset();
    this.router.navigate(['/events']);
  }
}
