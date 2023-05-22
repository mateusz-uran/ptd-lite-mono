import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useFormik } from "formik";
import useFuelService from '../../api/FuelService/FuelServiceHook';
import { useTranslation } from 'react-i18next';

function AddAdBlue(props) {
    const { t } = useTranslation();
    const { createAdBlue } = useFuelService();

    const navigate = useNavigate();
    let { cardId } = useParams();

    const formik = useFormik({
        initialValues: {
            date: '',
            localization: '',
            amount: '',
        },
        validationSchema: Yup.object({
            date: Yup.string().required(t('yup.empty')),
            localization: Yup.string().required(t('yup.empty')),
            amount: Yup.string().required(t('yup.empty')),
        }),
        onSubmit: (values) => {
            createAdBlue(cardId, values)
                .then(() => {
                    navigate(-1);
                }, (error) => {
                    console.log(error)
                })
        },
    });

    return (
        <div className='flex flex-col'>
            <div className='text-left p-2'>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ fontWeight: 'bold' }}>{t('misc.goBackButton')}</Button>
            </div>
            <form onSubmit={formik.handleSubmit} className='text-center'>
                <div>
                    <TextField
                        name="date"
                        label={t('addFuel.date')}
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                        sx={{ margin: 1 }}
                    />
                    <TextField
                        name="localization"
                        label={t('addFuel.location')}
                        value={formik.values.localization}
                        onChange={formik.handleChange}
                        error={formik.touched.localization && Boolean(formik.errors.localization)}
                        helperText={formik.touched.localization && formik.errors.localization}
                        sx={{ margin: 1 }}
                    />
                    <TextField
                        name="amount"
                        label={t('addFuel.amount')}
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                        sx={{ margin: 1 }}
                    />
                </div>
                <div className='text-right p-2'>
                    <Button type="submit" variant='contained' sx={{ marginRight: 1, fontWeight: 'bold' }}>{t('addFuel.submit')}</Button>
                </div>
            </form>
        </div>
    );
}

export default AddAdBlue;