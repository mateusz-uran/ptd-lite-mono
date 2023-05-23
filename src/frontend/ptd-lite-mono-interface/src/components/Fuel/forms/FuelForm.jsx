import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FuelForm(props) {
    const { service, inputs, validations, button } = props;

    const navigate = useNavigate();
    let { cardId } = useParams();

    const formik = useFormik({
        initialValues: Object.fromEntries(inputs.map(field => [field.name, ''])),
        validationSchema: validations,
        onSubmit: (values) => {
            service(cardId, values)
                .then(() => {
                    navigate(-1);
                }, (error) => {
                    console.log(error)
                })
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='text-center'>
                {inputs.map(field => (
                    <TextField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                        helperText={formik.touched[field.name] && formik.errors[field.name]}
                        sx={{ margin: 1 }}
                    />
                ))}
                <div className='text-right p-2'>
                    <Button type="submit" variant='contained' sx={{ marginRight: 1, fontWeight: 'bold' }}>{button}</Button>
                </div>
            </form>
        </div>
    );
}

export default FuelForm;