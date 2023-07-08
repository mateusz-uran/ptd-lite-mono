import i18next from 'i18next';

export const translateCardInputs = () => {
  return {
    name: 'cardNumber',
    label: i18next.t('cardFormInput.number'),
    type: 'text',
    placeholder: i18next.t('cardFormInput.number'),
  };
};
