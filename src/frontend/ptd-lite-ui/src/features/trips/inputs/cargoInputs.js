import i18next from 'i18next';

export const translateCargoInputs = () => {
  return [
    {
      name: 'cargoName',
      label: i18next.t('misc.cargo'),
      type: 'text',
      placeholder: i18next.t('misc.cargo'),
    },
    {
      name: 'weight',
      label: i18next.t('misc.weight'),
      type: 'number',
      placeholder: i18next.t('misc.weight'),
    },
    {
      name: 'temperature',
      label: i18next.t('misc.temperature'),
      type: 'number',
      placeholder: i18next.t('misc.temperature'),
    },
    {
      name: 'notes',
      label: i18next.t('misc.notes'),
      type: 'text',
      placeholder: i18next.t('misc.notes'),
    },
  ];
};
