import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FuelForm from './FuelForm';
import { useNavigate } from 'react-router-dom';
import useFuelService from '../../../api/FuelService/FuelServiceHook';
import { inputsRefueling, validationSchemaRefueling } from './inputs';

function AddFuel(props) {
    const { t } = useTranslation();
    const { createFuel } = useFuelService();

    const navigate = useNavigate();

    return (
        <div className='flex flex-col'>
            <div className='text-left p-2'>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ fontWeight: 'bold' }}>{t('misc.goBackButton')}</Button>
            </div>
            <FuelForm service={createFuel} inputs={inputsRefueling} validations={validationSchemaRefueling} button={t('addFuel.submit')} />
        </div>
    );
}

export default AddFuel;