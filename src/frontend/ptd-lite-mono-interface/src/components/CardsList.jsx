import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { IconButton, TextField, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useCardService from '../api/CardServiceHook';

function CardsList(props) {
    const { user, mode } = props;

    const { createCard } = useCardService();

    const [cardsList, setCardsList] = useState([]);

    const formik = useFormik({
        initialValues: {
            number: '',
        },
        validationSchema: yup.object({
            number: yup.string().required("Cannot be empty"),
        }),
        onSubmit: (values, { resetForm }) => {
            let cardPayload = {
                number: values.number,
                username: user
            }
            let year = 2023;
            let month = 5;
            let day = 6;
            createCard(cardPayload, year, month, day)
                .then(response => {
                    setCardsList(cardsList => [...cardsList, response.data]);
                    resetForm();
                }, (error) => {
                    console.log(error)
                })
        },
    });


    return (
        <div className={`flex lg:flex-row flex-col px-4 ${mode ? 'text-white' : ''}`}>
            <div className='lg:w-1/6 my-2'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex items-center'>
                        <TextField
                            id="number"
                            name="number"
                            label="number"
                            value={formik.values.number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.number && Boolean(formik.errors.number)}
                            helperText={formik.touched.number && formik.errors.number}
                        />
                        <IconButton type="submit">
                            <AddIcon className={mode ? 'text-white' : ''} />
                        </IconButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CardsList;