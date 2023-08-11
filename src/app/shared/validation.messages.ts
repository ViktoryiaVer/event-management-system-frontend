export const validationMessages = {
  participantForm: {
    firstName: {
      required: 'First name is required.',
      minlength: 'First name must be at least three characters.',
    },
    lastName: {
      required: 'Last name is required.',
    },
    email: {
      required: 'Email is required.',
      email: 'PLease, enter a valid email',
    },
  },

  eventForm: {
    name: {
      required: 'Event name is required',
    },
    description: {
      required: 'Event description is required',
    },
    theme: {
      required: 'Event theme is required',
    },
    durationInMinutes: {
      required: 'Event duration is required',
      min: 'Event duration cannot be 0',
    },
  },
};
