import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Observable, Subscription, debounceTime, fromEvent, merge } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { validationMessages } from 'src/app/shared/validation.messages';

@Component({
  selector: 'ems-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  pageTitle: string = 'Edit an event';
  event!: Event;

  eventForm!: FormGroup;
  subscription!: Subscription;
  errorMessage!: string;

  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator = new GenericValidator(
    validationMessages.eventForm
  );

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

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(this.eventForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(
          this.eventForm
        );
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
      error: (err) => (this.errorMessage = err),
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
          error: (err) => (this.errorMessage = err),
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
