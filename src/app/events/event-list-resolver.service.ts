import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EventListResolved } from './event.model';
import { Observable, catchError, map, of } from 'rxjs';
import { EventService } from './event.service';

export const EventListResolver: ResolveFn<EventListResolved> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  eventService: EventService = inject(EventService)
): Observable<EventListResolved> => {
  return eventService.getEvents().pipe(
    map((events) => ({ events: events })),
    catchError((error) => {
      return of({ events: null, error });
    })
  );
};
