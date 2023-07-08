import * as yup from 'yup';
import { t } from 'i18next';

export const translatedPetrolSingleSchema = () => {
  return yup.object({
    refuelingDate: yup.string().required(t('yupValidations.empty')),
    refuelingLocation: yup.string().required(t('yupValidations.empty')),
    vehicleCounter: yup
      .number()
      .typeError(t('yupValidations.number'))
      .required(t('yupValidations.empty')),
    refuelingAmount: yup
      .number()
      .typeError(t('yupValidations.number'))
      .required(t('yupValidations.empty')),
    paymentMethod: yup.string().required(t('yupValidations.empty')),
  });
};

export const translatedAdBlueSingleSchema = () => {
  return yup.object({
    adBlueDate: yup.string().required(t('yupValidations.empty')),
    adBlueLocalization: yup.string().required(t('yupValidations.empty')),
    adBlueAmount: yup
      .number()
      .typeError(t('yupValidations.number'))
      .required(t('yupValidations.empty')),
  });
};

export const translatedPetrolArraySchema = () => {
  return yup.object().shape({
    inputs: yup.array().of(
      yup.object().shape({
        refuelingDate: yup.string().required(t('yupValidations.empty')),
        refuelingLocation: yup.string().required(t('yupValidations.empty')),
        vehicleCounter: yup
          .number()
          .typeError(t('yupValidations.number'))
          .required(t('yupValidations.empty')),
        refuelingAmount: yup
          .number()
          .typeError(t('yupValidations.number'))
          .required(t('yupValidations.empty')),
        paymentMethod: yup.string().required(t('yupValidations.empty')),
      })
    ),
  });
};

export const translatedBlueArraySchema = () => {
  return yup.object().shape({
    inputs: yup.array().of(
      yup.object().shape({
        adBlueDate: yup.string().required(t('yupValidations.empty')),
        adBlueLocalization: yup.string().required(t('yupValidations.empty')),
        adBlueAmount: yup
          .number()
          .typeError(t('yupValidations.number'))
          .required(t('yupValidations.empty')),
      })
    ),
  });
};
