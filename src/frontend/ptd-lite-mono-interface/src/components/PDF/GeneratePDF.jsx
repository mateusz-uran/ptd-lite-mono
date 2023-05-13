import React from 'react';
import { Button } from '@mui/material';
import usePdfService from '../../api/PdfService/PdfServiceHook';
import { useTranslation } from 'react-i18next';

function GeneratePDF(props) {
    const { t } = useTranslation();
    const { user, cardNumber, cardTrips, cardFuels, setProgress, setSnackbarInformation } = props;
    const { generatePdf } = usePdfService();

    const generate = () => {
        let pdfRequest = {
            number: cardNumber,
            cardTripsList: cardTrips,
            cardFuelsList: cardFuels,
        }

        generatePdf(user, pdfRequest, (progressEvent) => {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        })
            .then(response => {
                const file = new Blob([response.data], { type: "application/pdf" });
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(file);
                link.download = cardNumber + ".pdf";
                link.click();
                setProgress(0);
            }, (error) => {
                console.log("Error: ", error);
                setSnackbarInformation(prevState => ({
                    ...prevState,
                    open: true,
                    type: 'warning',
                    message: t('pdf.warningMessage'),
                }))
                setProgress(0);
            });
    }

    return (
        <div>
            <Button onClick={() => generate()} variant="outlined" sx={{ fontWeight: 'bold', marginX: 1 }}>{t('pdf.genratePdfButton')}</Button>
        </div>
    );
}

export default GeneratePDF;