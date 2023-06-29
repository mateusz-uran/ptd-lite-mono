import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import useFuelService from '../../../api/FuelService/FuelServiceHook';
import { useTranslation } from 'react-i18next';
import FuelForm from './FuelForm';

function AddAdBlue(props) {
  const { t } = useTranslation();
  const { createAdBlue } = useFuelService();

  const navigate = useNavigate();

  const inputs = [
    { name: 'adBlueDate', label: t('addFuel.date') },
    { name: 'adBlueLocalization', label: t('addFuel.location') },
    { name: 'adBlueAmount', label: t('addFuel.amount') },
  ];

  const validation = Yup.object({
    adBlueDate: Yup.string().required(t('yup.empty')),
    adBlueLocalization: Yup.string().required(t('yup.empty')),
    adBlueAmount: Yup.number()
      .typeError(t('yup.number'))
      .required(t('yup.empty')),
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
        service={createAdBlue}
        inputs={inputs}
        validations={validation}
        button={t('addFuel.submit')}
      />
    </div>
  );
}

export default AddAdBlue;
