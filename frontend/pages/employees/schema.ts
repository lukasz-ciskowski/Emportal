import * as yup from 'yup';

export const experienceValidationSchema = yup.object().shape({
  from: yup.date().required(),
  to: yup.date().required().nullable().min(yup.ref('from')),
  title: yup.string().required(),
  description: yup.string().required(),
});

export const validationSchema = yup.object().shape({
  about: yup.string().required(),
  interests: yup.array().of(yup.string()),
  experience: yup.array().of(experienceValidationSchema),
});

export interface FormExperience {
  from: Date;
  to: Date | null;
  title: string;
  description: string;
}
