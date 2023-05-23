import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import useFuelService from '../../../api/FuelService/FuelServiceHook';
import { useTranslation } from 'react-i18next';
import FuelForm from './FuelForm';
import { inputsAdBlue, validationSchemaAdBlue } from './inputs';

function AddAdBlue(props) {
    const { t } = useTranslation();
    const { createAdBlue } = useFuelService();

    const navigate = useNavigate();

    return (
        <div className='flex flex-col'>
            <div className='text-left p-2'>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ fontWeight: 'bold' }}>{t('misc.goBackButton')}</Button>
            </div>
            <FuelForm service={createAdBlue} inputs={inputsAdBlue} validations={validationSchemaAdBlue} button={t('addFuel.submit')} />
        </div>
    );
}

export default AddAdBlue;