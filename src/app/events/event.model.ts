export interface Event {
  id: string;
  name: string;
  description: string;
  theme: string;
  durationInMinutes: string;
  participants: Participant[];
}

export interface Participant {
  firstName: string;
  lastName: string;
  email: string;
}

export interface EventResolved {
  event: Event | null;
  error?: string;
}

export interface EventListResolved {
  events: Event[] | null;
  error?: string;
}
