import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
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
import { Observable, Subscription, debounceTime, fromEvent, merge } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { validationMessages } from 'src/app/shared/validation.messages';

@Component({
  selector: 'ems-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css'],
})
export class AddParticipantComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  pageTitle: string = 'Add a participant to the event';
  participantForm!: FormGroup;
  eventId!: string;
  errorMessage!: string;

  displayMessage: { [key: string]: string } = {};
  private genericValidator = new GenericValidator(
    validationMessages.participantForm
  );

  private validationSubscription!: Subscription;

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
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    this.validationSubscription = this.validationSubscription = merge(
      this.participantForm.valueChanges,
      ...controlBlurs
    )
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
        this.eventService
          .addParticipantToEvent(this.participantForm.value, this.eventId)
          .subscribe({
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

  ngOnDestroy(): void {
    this.validationSubscription.unsubscribe();
  }
}
