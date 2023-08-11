import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ems-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  pageTitle: string = 'Create a new event';
  eventForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      theme: ['', Validators.required],
      durationInMinutes: ['', [Validators.required, Validators.min(1)]],
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

  saveEvent() {
    this.submitted = true;
    if (this.eventForm.valid) {
      this.eventService.saveEvent(this.eventForm.value).subscribe({
        next: () => this.onSaveComplete(),
      });
    }
  }

  onSaveComplete(): void {
    this.eventForm.reset();
    this.submitted = false;
    this.router.navigate(['/events']);
  }
}
