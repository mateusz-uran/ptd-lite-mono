import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import useCardService from '../../api/CardService/CardServiceHook';
import { Button } from '@mui/material';
import CustomSnackbar from '../../components/misc/CustomSnackbar';
import LinearProgressWithLabel from '../misc/LinearProgressWithLabel';
import TripTable from '../Trip/TripTable';
import FuelTable from '../Fuel/FuelTable';
import GeneratePDF from '../PDF/GeneratePDF';
import { useTranslation } from 'react-i18next';

function CardSpecification(props) {
    const { t } = useTranslation();
    const [cardId, cardNumber, user] = useOutletContext();
    const { getCardDetails } = useCardService();

    const [cardTrips, setCardTrips] = useState([]);
    const [cardFuels, setCardFuels] = useState([]);

    const [progress, setProgress] = useState(0);
    const [snackBarInformation, setSnackbarInformation] = useState({
        open: false,
        type: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const cardDetails = await getCardDetails(cardId);
                setCardTrips(cardDetails.data.trips);
                setCardFuels(cardDetails.data.fuels);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [cardId])

    return (
        <div>
            <CustomSnackbar
                open={snackBarInformation.open}
                description={snackBarInformation.message}
                severity={snackBarInformation.type}
                setOpen={setSnackbarInformation}
            />
            <div className='lg:px-5 my-2'>
                <div className='flex pb-1'>
                    <Link to={`../${cardId}/add-trip`} relative="path">
                        <Button variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>{t('cardsSpecification.addTripButton')}</Button>
                    </Link>

                    <Link to={`../${cardId}/add-fuel`} relative="path">
                        <Button variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>{t('cardsSpecification.addFuelButton')}</Button>
                    </Link>

                    {cardTrips && cardTrips.length > 1 && cardFuels && cardFuels.length > 0 &&
                        <GeneratePDF
                            user={user}
                            cardNumber={cardNumber}
                            cardTrips={cardTrips}
                            cardFuels={cardFuels}
                            setProgress={setProgress}
                            setSnackbarInformation={setSnackbarInformation}
                        />
                    }
                </div>
                <div>
                    <LinearProgressWithLabel value={progress} />
                </div>
                {isLoading ? (<></>) : (
                    <>
                        <TripTable cardId={cardId} cardTrips={cardTrips} />
                        <FuelTable cardId={cardId} cardFuels={cardFuels} />
                    </>
                )}
            </div>
        </div>
    );
}

export default CardSpecification;