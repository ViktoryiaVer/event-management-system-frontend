import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';
import { Observable, debounceTime, fromEvent, merge } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { validationMessages } from 'src/app/shared/validation.messages';

@Component({
  selector: 'ems-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css'],
})
export class AddParticipantComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  pageTitle: string = 'Add a participant to the event';
  participantForm!: FormGroup;
  eventId!: string;
  event!: Event;
  errorMessage!: string;

  displayMessage: { [key: string]: string } = {};
  private genericValidator = new GenericValidator(
    validationMessages.participantForm
  );

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

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(this.participantForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(
          this.participantForm
        );
      });
  }

  saveParticipant() {
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
          error: (err) => (this.errorMessage = err),
        });
      }
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.participantForm.reset();
    this.router.navigate(['/events', this.eventId]);
  }
}
