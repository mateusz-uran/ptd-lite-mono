import i18next from 'i18next';

export const petrolInputs = [
  {
    name: 'refuelingDate',
    label: 'Date',
    type: 'text',
    placeholder: 'Date',
    width: '75px',
  },
  {
    name: 'refuelingLocation',
    label: 'Location',
    type: 'text',
    placeholder: 'Location',
    width: '110px',
  },
  {
    name: 'vehicleCounter',
    label: 'Counter',
    type: 'number',
    placeholder: 'Counter',
    width: '65px',
  },
  {
    name: 'refuelingAmount',
    label: 'Amount',
    type: 'number',
    placeholder: 'Amount',
    width: '55px',
  },
  {
    name: 'paymentMethod',
    label: 'Payment',
    type: 'text',
    placeholder: 'Payment',
    width: '75px',
  },
];

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

export const blueInputs = [
  {
    name: 'adBlueDate',
    label: 'Date',
    type: 'text',
    placeholder: 'Date',
    width: '75px',
  },
  {
    name: 'adBlueLocalization',
    label: 'Location',
    type: 'text',
    placeholder: 'Location',
    width: '110px',
  },
  {
    name: 'adBlueAmount',
    label: 'Amount',
    type: 'number',
    placeholder: 'Amount',
    width: '55px',
  },
];

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
