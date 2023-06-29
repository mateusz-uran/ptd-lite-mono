import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FuelForm from './FuelForm';
import { useNavigate } from 'react-router-dom';
import useFuelService from '../../../api/FuelService/FuelServiceHook';

function AddFuel(props) {
  const { t } = useTranslation();
  const { createFuel } = useFuelService();

  const navigate = useNavigate();

  const inputs = [
    { name: 'refuelingDate', label: t('addFuel.date') },
    { name: 'refuelingLocation', label: t('addFuel.location') },
    { name: 'vehicleCounter', label: t('addFuel.counter') },
    { name: 'refuelingAmount', label: t('addFuel.amount') },
    { name: 'paymentMethod', label: t('addFuel.payment') },
  ];
  const validation = Yup.object({
    refuelingDate: Yup.string().required(t('yup.empty')),
    refuelingLocation: Yup.string().required(t('yup.empty')),
    vehicleCounter: Yup.string().required(t('yup.empty')),
    refuelingAmount: Yup.number()
      .typeError(t('yup.number'))
      .required(t('yup.empty')),
    paymentMethod: Yup.string().required(t('yup.empty')),
  });

  return (
    <div className="flex flex-col">
      <div className="text-left p-2">
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ fontWeight: 'bold' }}
        >
          {t('misc.goBackButton')}
        </Button>
      </div>
      <FuelForm
        service={createFuel}
        inputs={inputs}
        validations={validation}
        button={t('addFuel.submit')}
      />
    </div>
  );
}

export default AddFuel;
