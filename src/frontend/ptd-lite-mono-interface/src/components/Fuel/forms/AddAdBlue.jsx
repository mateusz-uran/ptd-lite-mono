import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import useFuelService from '../../../api/FuelService/FuelServiceHook';
import { useTranslation } from 'react-i18next';
import FuelForm from './FuelForm';

function AddAdBlue(props) {
    const { t } = useTranslation();
    const { createAdBlue } = useFuelService();

    const navigate = useNavigate();

    const inputs = [
        { name: 'date', label: t('addFuel.date') },
        { name: 'localization', label: t('addFuel.location') },
        { name: 'amount', label: t('addFuel.amount') },
    ];

    const validation = Yup.object({
        date: Yup.string().required(t('yup.empty')),
        localization: Yup.string().required(t('yup.empty')),
        amount: Yup.string().required(t('yup.empty')),
    });

    return (
        <div className='flex flex-col'>
            <div className='text-left p-2'>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ fontWeight: 'bold' }}>{t('misc.goBackButton')}</Button>
            </div>
            <FuelForm service={createAdBlue} inputs={inputs} validations={validation} button={t('addFuel.submit')} />
        </div>
    );
}

export default AddAdBlue;