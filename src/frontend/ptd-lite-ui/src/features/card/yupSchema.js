import * as yup from 'yup';

export const cardSchema = yup.object({
  number: yup
    .string()
    .min(3, 'Minimum 3 characters')
    .required('Cannot be empty'),
});
