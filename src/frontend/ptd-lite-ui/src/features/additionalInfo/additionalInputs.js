import i18next from 'i18next';

export const formInputs = [
  {
    name: 'fuelInitialState',
    placeholder: 'Initial state',
    label: 'Initial state',
  },
  {
    name: 'fuelEndState',
    placeholder: 'End state',
    label: 'End state',
  },
  {
    name: 'aggregateInitialState',
    placeholder: 'Initial state',
    label: 'Initial state',
  },
  {
    name: 'aggregateAdBlue',
    placeholder: 'AdBlue',
    label: 'AdBlue',
  },
  {
    name: 'aggregateEndState',
    placeholder: 'End state',
    label: 'End state',
  },
  {
    name: 'avgFuelConsumption',
    placeholder: 'Avg consumption',
    label: 'Avg consumption',
  },
  {
    name: 'totalFuelConsumption',
    placeholder: 'Total consumption',
    label: 'Total consumption',
  },
  {
    name: 'avgSpeed',
    placeholder: 'Avg speed',
    label: 'Avg speed',
  },
  {
    name: 'fuelConsumptionIdle',
    placeholder: 'Idle consumption',
    label: 'Idle consumption',
  },
  {
    name: 'fuelConsumptionUneconomical',
    placeholder: 'Uneconomical consumption',
    label: 'Uneconomical consumption',
  },
];

export const translateAdditionalInputs = () => {
  return [
    {
      name: 'fuelInitialState',
      label: i18next.t('additonalInputs.fuelInitialState'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.fuelInitialState'),
    },
    {
      name: 'fuelEndState',
      label: i18next.t('additonalInputs.fuelEndState'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.fuelEndState'),
    },
    {
      name: 'aggregateInitialState',
      label: i18next.t('additonalInputs.aggregateInitialState'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.aggregateInitialState'),
    },
    {
      name: 'aggregateAdBlue',
      label: i18next.t('additonalInputs.aggregateAdBlue'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.aggregateAdBlue'),
    },
    {
      name: 'aggregateEndState',
      label: i18next.t('additonalInputs.aggregateEndState'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.aggregateEndState'),
    },
    {
      name: 'avgFuelConsumption',
      label: i18next.t('additonalInputs.avgFuelConsumption'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.avgFuelConsumption'),
    },
    {
      name: 'totalFuelConsumption',
      label: i18next.t('additonalInputs.totalFuelConsumption'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.totalFuelConsumption'),
    },
    {
      name: 'avgSpeed',
      label: i18next.t('additonalInputs.avgSpeed'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.avgSpeed'),
    },
    {
      name: 'fuelConsumptionIdle',
      label: i18next.t('additonalInputs.fuelConsumptionIdle'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.fuelConsumptionIdle'),
    },
    {
      name: 'fuelConsumptionUneconomical',
      label: i18next.t('additonalInputs.fuelConsumptionUneconomical'),
      type: 'text',
      placeholder: i18next.t('additonalInputs.fuelConsumptionUneconomical'),
    },
  ];
};
