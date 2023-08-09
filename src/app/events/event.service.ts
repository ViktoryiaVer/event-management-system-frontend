import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private endPointUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.endPointUrl);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.endPointUrl}/${id}`);
  }

  saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.endPointUrl, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.endPointUrl}/${event.id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endPointUrl}/${id}`);
  }
}
