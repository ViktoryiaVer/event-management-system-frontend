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
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { validationMessages } from 'src/app/shared/validation.messages';
import { Observable, debounceTime, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'ems-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  pageTitle: string = 'Create a new event';
  eventForm!: FormGroup;
  errorMessage!: string;

  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator = new GenericValidator(
    validationMessages.eventForm
  );

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

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

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      theme: ['', Validators.required],
      durationInMinutes: ['', [Validators.required, Validators.min(1)]],
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

  saveEvent() {
    if (this.eventForm.valid) {
      this.eventService.saveEvent(this.eventForm.value).subscribe({
        next: () => this.onSaveComplete(),
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  onSaveComplete(): void {
    this.eventForm.reset();
    this.router.navigate(['/events']);
  }
}
