import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Event, Participant } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private endPointUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http
      .get<Event[]>(this.endPointUrl)
      .pipe(catchError(this.handleError));
  }

  getEvent(id: string): Observable<Event> {
    return this.http
      .get<Event>(`${this.endPointUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  saveEvent(event: Event): Observable<Event> {
    return this.http
      .post<Event>(this.endPointUrl, event)
      .pipe(catchError(this.handleError));
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http
      .put<Event>(`${this.endPointUrl}/${event.id}`, event)
      .pipe(catchError(this.handleError));
  }

  addParticipantToEvent(
    participant: Participant,
    eventId: string
  ): Observable<Event> {
    return this.http
      .put<Event>(`${this.endPointUrl}/${eventId}/participants`, participant)
      .pipe(catchError(this.handleError));
  }

  deleteEvent(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.endPointUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.error.error}`;
    }
    console.error(errorMessage);
    return throwError(
      () => new Error('Something unexpected happened; please try again later.')
    );
  }
}
