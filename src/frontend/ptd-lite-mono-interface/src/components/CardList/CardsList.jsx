import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { CircularProgress, Divider, IconButton, List, ListItemButton, ListItemText, TextField, useTheme, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useCardService from '../../api/CardService/CardServiceHook';
import { Link, Outlet } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import AlertDialog from '../misc/AlertDialog';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom"
import CustomSnackbar from '../misc/CustomSnackbar';

function CardsList(props) {
    const { t } = useTranslation();
    const theme = useTheme()
    const { user } = props;
    const current = new Date();
    const navigate = useNavigate()

    const { createCard, getCards, deleteCard } = useCardService();

    const [cardId, setCardId] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [cardsList, setCardsList] = useState([]);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [renderCardInfoHandler, setRenderCardInfoHandler] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState({
        cardId: 0,
        confirmation: false,
        title: '',
        subtitle: '',
        number: '',
        confirmFunction: ''
    });

    const [snackBarInformation, setSnackbarInformation] = useState({
        open: false,
        type: '',
        message: ''
    });

    const formik = useFormik({
        initialValues: {
            number: '',
        },
        validationSchema: yup.object({
            number: yup.string().required(t('cardsList.cardFormYupValidation')),
        }),
        onSubmit: (values, { resetForm }) => {
            let cardPayload = {
                number: values.number,
                username: user
            }
            createCard(cardPayload, current.getFullYear(), current.getMonth() + 1, current.getDate())
                .then(response => {
                    setCardsList(cardsList => [...cardsList, response.data]);
                    resetForm();
                }, (error) => {
                    if (error.response.data.description != null) {
                        setSnackbarInformation(prevState => ({
                            ...prevState,
                            open: true,
                            type: 'warning',
                            message: error.response.data.description,
                        }))
                    }  
                })
        },
    });

    const handleCardInformation = (id, number) => {
        setCardId(id);
        setCardNumber(number);
        localStorage.setItem('selectedCard', JSON.stringify(id));
        localStorage.setItem('selectedCardNumber', JSON.stringify(number));
        if (renderCardInfoHandler === true && cardId !== 0 && cardNumber !== '') {
            setRenderCardInfoHandler(false);
            setRenderCardInfoHandler(true);
        } else {
            setRenderCardInfoHandler(true);
        }
    }

    const handleDeleteCard = (id) => {
        deleteCard(id)
            .then(() => {
                setCardsList(cardsList.filter(card => card.id !== id));
                setRenderCardInfoHandler(false);
                localStorage.removeItem('selectedCard');
                localStorage.removeItem('selectedCardNumber');
                navigate(-1);
            })
    }

    useEffect(() => {
        setOpenBackdrop(true);
        async function fetchCards() {
            const response = await getCards(user, current.getFullYear(), current.getMonth() + 1);
            setCardsList(response.data);
            setOpenBackdrop(false);
        }
        fetchCards()
            .catch(() => {
                console.error();
                setOpenBackdrop(false);
            });

        let storedCardId = JSON.parse(localStorage.getItem('selectedCard'));
        let storedCardNumber = JSON.parse(localStorage.getItem('selectedCardNumber'));
        if (storedCardId !== undefined && storedCardId !== null && storedCardNumber !== undefined && storedCardNumber !== null) {
            setCardId(storedCardId);
            setCardNumber(storedCardNumber);
            setRenderCardInfoHandler(true);
        }
    }, [])

    return (
        <div className={`flex lg:flex-row flex-col px-4 ${theme.palette.mode === 'ligth' ? 'text-white' : ''}`}>
            <Backdrop
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <AlertDialog
                title={confirmOpen.title}
                subtitle={confirmOpen.subtitle}
                number={confirmOpen.number}
                open={confirmOpen.confirmation}
                selectedCardId={confirmOpen.cardId}
                setOpen={setConfirmOpen}
                onConfirm={confirmOpen.confirmFunction}
            ></AlertDialog>
            <CustomSnackbar
                open={snackBarInformation.open}
                description={snackBarInformation.message}
                severity={snackBarInformation.type}
                setOpen={setSnackbarInformation}
            />
            <div className='lg:w-1/6 my-2'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex items-center'>
                        <TextField
                            id="number"
                            name="number"
                            label={t('cardsList.cardFormLabel')}
                            value={formik.values.number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.number && Boolean(formik.errors.number)}
                            helperText={formik.touched.number && formik.errors.number}
                            data-testid="material-text-field"
                        />
                        <IconButton
                            type="submit"
                            data-testid='material-icon-button'
                        >
                            <AddIcon className={theme.palette.mode === 'dark' ? 'text-white' : ''} />
                        </IconButton>
                    </div>
                </form>
                {cardsList && cardsList.length > 0 ? (cardsList.map((card, index) => {
                    return (
                        <div key={index}>
                            <List>
                                <Link to={`card/${card.id}`}>
                                    <ListItemButton
                                        selected={renderCardInfoHandler && cardId === card.id}
                                        onClick={() => handleCardInformation(card.id, card.number)}
                                    >
                                        <ListItemText
                                            sx={{
                                                color: theme.palette.mode === 'dark' ? 'white' : ''
                                            }}
                                            primary={card.number}
                                            data-testid="material-text-item"
                                        />
                                        <IconButton
                                            edge="end"
                                            onClick={() =>
                                                setConfirmOpen(prevState => ({
                                                    ...prevState,
                                                    confirmation: true,
                                                    cardId: card.id,
                                                    title: t('cardsList.confirmDialogTitle'),
                                                    subtitle: t('cardsList.confirmDialogSubtitle'),
                                                    number: card.number,
                                                    confirmFunction: handleDeleteCard
                                                }))}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                </Link>
                                <Divider sx={{ borderBottomWidth: 2 }} />
                            </List>
                        </div>)
                })) :
                    (<List>
                        <ListItemButton>
                            <ListItemText sx={{ color: theme.palette.mode === 'dark' ? 'white' : '' }}>No cards found</ListItemText>
                        </ListItemButton>
                    </List>)
                }
            </div>
            <Divider orientation="vertical" flexItem sx={{ borderWidth: 1 }} />
            <div className='w-full'>
                {renderCardInfoHandler && cardId && cardNumber &&
                    <Outlet context={[cardId, cardNumber, user]} />
                }
            </div>
        </div>
    );
}

export default CardsList;