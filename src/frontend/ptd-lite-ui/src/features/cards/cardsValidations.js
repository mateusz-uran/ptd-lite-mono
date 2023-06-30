import * as yup from 'yup';
import { t } from 'i18next';

export const translateCardValidations = () => {
  return yup.object({
    cardNumber: yup
      .string()
      .min(3, t('yupValidations.minimum'))
      .required(t('yupValidations.empty')),
  });
};
