import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Button, Divider, TextField } from '@mui/material';
import { useFormik } from "formik";
import useTripService from '../../api/TripService/TripServiceHook';
import { useTranslation } from 'react-i18next';

function AddTrip(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { createFixed } = useTripService();
    let { cardId } = useParams();

    const formik = useFormik({
        initialValues: {
            rows: [{
                dayStart: '', hourStart: '', locationStart: '', countryStart: '', counterStart: '',
                dayEnd: '', hourEnd: '', locationEnd: '', countryEnd: '', counterEnd: ''
            }]
        },
        validationSchema: Yup.object().shape({
            rows: Yup.array().of(
                Yup.object().shape({
                    dayStart: Yup.string().required(t('yup.empty')),
                    hourStart: Yup.string().required(t('yup.empty')),
                    locationStart: Yup.string().required(t('yup.empty')),
                    countryStart: Yup.string().required(t('yup.empty')),
                    counterStart: Yup.number().typeError(t('yup.number')).positive(t('yup.positive')).required(t('yup.empty')),

                    dayEnd: Yup.string().required(t('yup.empty')),
                    hourEnd: Yup.string().required(t('yup.empty')),
                    locationEnd: Yup.string().required(t('yup.empty')),
                    countryEnd: Yup.string().required(t('yup.empty')),
                    counterEnd: Yup.number().typeError(t('yup.number')).positive(t('yup.positive')).required(t('yup.empty')),
                })
            )
        }),
        onSubmit: (values) => {
            createFixed(cardId, values.rows).then(
                () => {
                    navigate(-1);
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    });

    const handleAddRow = () => {
        formik.setValues({
            ...formik.values,
            rows: [...formik.values.rows,
            {
                dayStart: '', hourStart: '',
                //**location, country and counter are copies from END values */
                locationStart: formik.values.rows.length ? formik.values.rows[formik.values.rows.length - 1].locationEnd : '',
                countryStart: formik.values.rows.length ? formik.values.rows[formik.values.rows.length - 1].countryEnd : '',
                counterStart: formik.values.rows.length ? formik.values.rows[formik.values.rows.length - 1].counterEnd : '',
                dayEnd: '', hourEnd: '', locationEnd: '', countryEnd: '', counterEnd: ''
            }
            ]
        });
    };

    const handleRemoveRow = (index) => {
        const rows = [...formik.values.rows];
        rows.splice(index, 1);
        formik.setValues({
            ...formik.values,
            rows: rows
        });
    };

    return (
        <div className='flex flex-col'>
            <div className='text-left p-2'>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ fontWeight: 'bold' }}>{t('misc.goBackButton')}</Button>
            </div>
            <form onSubmit={formik.handleSubmit} className='text-center'>
                {formik.values.rows.map((row, index) => (
                    <div key={index}>
                        <div className='flex flex-col'>
                            <div>
                                <p>{t('misc.start')}</p>
                                <TextField
                                    label={t('addTrip.day')}
                                    name={`rows.${index}.dayStart`}
                                    value={formik.values.rows[index].dayStart}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.dayStart && Boolean(formik.errors.rows?.[index]?.dayStart)}
                                    helperText={formik.touched.rows?.[index]?.dayStart && formik.errors.rows?.[index]?.dayStart}
                                    sx={{ margin: 1 }}
                                />
                                <TextField
                                    label={t('addTrip.hour')}
                                    name={`rows.${index}.hourStart`}
                                    value={formik.values.rows[index].hourStart}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.hourStart && Boolean(formik.errors.rows?.[index]?.hourStart)}
                                    helperText={formik.touched.rows?.[index]?.hourStart && formik.errors.rows?.[index]?.hourStart}
                                    sx={{ margin: 1 }}
                                />
                                <TextField
                                    label={t('addTrip.location')}
                                    name={`rows.${index}.locationStart`}
                                    value={formik.values.rows[index].locationStart}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.locationStart && Boolean(formik.errors.rows?.[index]?.locationStart)}
                                    helperText={formik.touched.rows?.[index]?.locationStart && formik.errors.rows?.[index]?.locationStart}
                                    sx={{ margin: 1 }}
                                />
                                <TextField
                                    label={t('addTrip.country')}
                                    name={`rows.${index}.countryStart`}
                                    value={formik.values.rows[index].countryStart}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.countryStart && Boolean(formik.errors.rows?.[index]?.countryStart)}
                                    helperText={formik.touched.rows?.[index]?.countryStart && formik.errors.rows?.[index]?.countryStart}
                                    sx={{ margin: 1 }}
                                />
                                <TextField
                                    label={t('addTrip.counter')}
                                    name={`rows.${index}.counterStart`}
                                    value={formik.values.rows[index].counterStart}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.counterStart && Boolean(formik.errors.rows?.[index]?.counterStart)}
                                    helperText={formik.touched.rows?.[index]?.counterStart && formik.errors.rows?.[index]?.counterStart}
                                    sx={{ margin: 1 }}
                                />
                            </div>
                            <div>
                                <p>{t('misc.end')}</p>
                                <TextField
                                    label={t('addTrip.day')}
                                    name={`rows.${index}.dayEnd`}
                                    value={formik.values.rows[index].dayEnd}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.dayEnd && Boolean(formik.errors.rows?.[index]?.dayEnd)}
                                    helperText={formik.touched.rows?.[index]?.dayEnd && formik.errors.rows?.[index]?.dayEnd}
                                    sx={{ margin: 1 }}
                                />
                                <TextField
                                    label={t('addTrip.hour')}
                                    name={`rows.${index}.hourEnd`}
                                    value={formik.values.rows[index].hourEnd}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.hourEnd && Boolean(formik.errors.rows?.[index]?.hourEnd)}
                                    helperText={formik.touched.rows?.[index]?.hourEnd && formik.errors.rows?.[index]?.hourEnd}
                                    sx={{ margin: 1 }}
                                />
                                <TextField
                                    label={t('addTrip.location')}
                                    name={`rows.${index}.locationEnd`}
                                    value={formik.values.rows[index].locationEnd}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.locationEnd && Boolean(formik.errors.rows?.[index]?.locationEnd)}
                                    helperText={formik.touched.rows?.[index]?.locationEnd && formik.errors.rows?.[index]?.locationEnd}
                                    sx={{ margin: 1 }}
                                />
                                <TextField
                                    label={t('addTrip.country')}
                                    name={`rows.${index}.countryEnd`}
                                    value={formik.values.rows[index].countryEnd}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.countryEnd && Boolean(formik.errors.rows?.[index]?.countryEnd)}
                                    helperText={formik.touched.rows?.[index]?.countryEnd && formik.errors.rows?.[index]?.countryEnd}
                                    sx={{ margin: 1 }}
                                />
                                <TextField
                                    label={t('addTrip.counter')}
                                    name={`rows.${index}.counterEnd`}
                                    value={formik.values.rows[index].counterEnd}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rows?.[index]?.counterEnd && Boolean(formik.errors.rows?.[index]?.counterEnd)}
                                    helperText={formik.touched.rows?.[index]?.counterEnd && formik.errors.rows?.[index]?.counterEnd}
                                    sx={{ margin: 1 }}
                                />
                            </div>
                            <div className='text-right'>
                                <Button
                                    type="button"
                                    onClick={() => handleRemoveRow(index)}
                                    disabled={formik.values.rows.length < 2 ? true : false}
                                    variant="outlined"
                                >{t('addTrip.removeButton')}</Button>
                            </div>
                        </div>
                        <Divider sx={{ paddingBottom: 2 }} />
                    </div>
                ))}
                <div className='text-right p-2'>
                    <Button type="submit" variant='contained' sx={{ marginRight: 1, fontWeight: 'bold' }}>{t('addTrip.submitButton')}</Button>
                    <Button type="button" onClick={handleAddRow} variant="outlined">{t('addTrip.addRowButton')}</Button>
                </div>
            </form>
        </div>
    );
}

export default AddTrip;