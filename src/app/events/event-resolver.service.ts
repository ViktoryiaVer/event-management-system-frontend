import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EventResolved } from './event.model';
import { Observable, catchError, map, of } from 'rxjs';
import { EventService } from './event.service';

export const EventResolver: ResolveFn<EventResolved> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  eventService: EventService = inject(EventService)
): Observable<EventResolved> => {
  const id = String(route.paramMap.get('id'));

  return eventService.getEvent(id).pipe(
    map((event) => ({ event: event })),
    catchError((error) => {
      return of({ event: null, error });
    })
  );
};
