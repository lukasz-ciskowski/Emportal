import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'To pole jest wymagane',
  },
  date: {
    min: 'Data nie jest prawidłowa',
  },
});
