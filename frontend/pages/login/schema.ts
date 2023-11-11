import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
});
