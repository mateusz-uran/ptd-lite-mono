import * as yup from 'yup';

export const petrolSchema = yup.object({
  refuelingDate: yup.string().required('Required'),
  refuelingLocation: yup.string().required('Required'),
  vehicleCounter: yup.number().typeError('Only number').required('Required'),
  refuelingAmount: yup.number().typeError('Only number').required('Required'),
  paymentMethod: yup.string().required('Required'),
});

export const adBlueSchema = yup.object({
  adBlueDate: yup.string().required('Required'),
  adBlueLocalization: yup.string().required('Required'),
  adBlueAmount: yup.number().typeError('Only number').required('Required'),
});

export const petrolArraySchema = yup.object().shape({
  inputs: yup.array().of(
    yup.object().shape({
      refuelingDate: yup.string().required('Required'),
      refuelingLocation: yup.string().required('Required'),
      vehicleCounter: yup
        .number()
        .typeError('Only number')
        .required('Required'),
      refuelingAmount: yup
        .number()
        .typeError('Only number')
        .required('Required'),
      paymentMethod: yup.string().required('Required'),
    })
  ),
});

export const adBlueArraySchema = yup.object().shape({
  inputs: yup.array().of(
    yup.object().shape({
      adBlueDate: yup.string().required('Required'),
      adBlueLocalization: yup.string().required('Required'),
      adBlueAmount: yup.number().typeError('Only number').required('Required'),
    })
  ),
});
