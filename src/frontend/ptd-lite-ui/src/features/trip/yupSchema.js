import * as yup from 'yup';

export const schema = yup.object().shape({
  inputs: yup.array().of(
    yup.object().shape({
      dayStart: yup.string().required('Day Start is required'),
      hourStart: yup.string().required('Hour Start is required'),
      locationStart: yup.string().required('Location Start is required'),
      countryStart: yup.string().required('Country Start is required'),
      counterStart: yup
        .number()
        .typeError('Counter Start must be a number')
        .required('Counter Start is required'),
      dayEnd: yup.string().required('Day End is required'),
      hourEnd: yup.string().required('Hour End is required'),
      locationEnd: yup.string().required('Location End is required'),
      countryEnd: yup.string().required('Country End is required'),
      counterEnd: yup
        .number()
        .typeError('Counter End must be a number')
        .required('Counter End is required'),
    })
  ),
});
