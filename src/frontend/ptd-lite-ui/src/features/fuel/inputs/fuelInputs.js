import i18next from 'i18next';

export const translatePetrolInputs = () => {
  return [
    {
      name: 'refuelingDate',
      label: i18next.t('petrolInputs.date'),
      type: 'text',
      placeholder: i18next.t('petrolInputs.date'),
      width: '75px',
    },
    {
      name: 'refuelingLocation',
      label: i18next.t('petrolInputs.location'),
      type: 'text',
      placeholder: i18next.t('petrolInputs.location'),
      width: '110px',
    },
    {
      name: 'vehicleCounter',
      label: i18next.t('petrolInputs.counter'),
      type: 'text',
      placeholder: i18next.t('petrolInputs.counter'),
      width: '65px',
    },
    {
      name: 'refuelingAmount',
      label: i18next.t('petrolInputs.amount'),
      type: 'text',
      placeholder: i18next.t('petrolInputs.amount'),
      width: '55px',
    },
    {
      name: 'paymentMethod',
      label: i18next.t('petrolInputs.payment'),
      type: 'text',
      placeholder: i18next.t('petrolInputs.payment'),
      width: '75px',
    },
  ];
};

export const translateAdBlueInputs = () => {
  return [
    {
      name: 'adBlueDate',
      label: i18next.t('adBlueInputs.date'),
      type: 'text',
      placeholder: i18next.t('adBlueInputs.date'),
      width: '75px',
    },
    {
      name: 'adBlueLocalization',
      label: i18next.t('adBlueInputs.location'),
      type: 'text',
      placeholder: i18next.t('adBlueInputs.location'),
      width: '110px',
    },
    {
      name: 'adBlueAmount',
      label: i18next.t('adBlueInputs.amount'),
      type: 'text',
      placeholder: i18next.t('adBlueInputs.amount'),
      width: '55px',
    },
  ];
};
