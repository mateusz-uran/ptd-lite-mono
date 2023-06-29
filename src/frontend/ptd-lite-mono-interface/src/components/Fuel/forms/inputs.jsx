import { t } from 'i18next';
import * as Yup from 'yup';

export const inputsAdBlue = [
  { name: 'date', label: t('addFuel.date') },
  { name: 'localization', label: t('addFuel.location') },
  { name: 'amount', label: t('addFuel.amount') },
];

export const validationSchemaAdBlue = Yup.object({
  date: Yup.string().required(t('yup.empty')),
  localization: Yup.string().required(t('yup.empty')),
  amount: Yup.string().required(t('yup.empty')),
});

export const inputsRefueling = [
    { name: 'refuelingDate', label: t('addFuel.date')},
    { name: 'refuelingLocation', label: t('addFuel.location') },
    { name: 'vehicleCounter', label: t('addFuel.counter') },
    { name: 'refuelingAmount', label: t('addFuel.amount') },
    { name: 'paymentMethod', label: t('addFuel.payment') },
];
export const validationSchemaRefueling = Yup.object({
    refuelingDate: Yup.string().required(t('yup.empty')),
    refuelingLocation: Yup.string().required(t('yup.empty')),
    vehicleCounter: Yup.string().required(t('yup.empty')),
    refuelingAmount: Yup.string().required(t('yup.empty')),
    paymentMethod: Yup.string().required(t('yup.empty')),
});
