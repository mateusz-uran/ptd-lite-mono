import * as yup from 'yup';

export const schema = yup.object().shape({
  inputs: yup.array().of(
    yup.object().shape({
      dayStart: yup.string().required('Required'),
      hourStart: yup.string().required('Required'),
      locationStart: yup.string().required('Required'),
      countryStart: yup.string().required('Required'),
      counterStart: yup.number().typeError('Only number').required('Required'),
      dayEnd: yup.string().required('Required'),
      hourEnd: yup.string().required('Required'),
      locationEnd: yup.string().required('Rrequired'),
      countryEnd: yup.string().required('Required'),
      counterEnd: yup.number().typeError('Only number').required('Required'),
    })
  ),
});
