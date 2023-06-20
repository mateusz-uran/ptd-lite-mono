import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import usePdfService from '../../api/PdfService/PdfServiceHook';
import PrintIcon from '@mui/icons-material/Print';

function GeneratePDFStepper({
  user,
  cardNumber,
  cardTrips,
  cardFuels,
  cardAdBlue,
  setProgress,
  setSnackbarInformation,
}) {
  const { t } = useTranslation();

  const inputs = [
    { name: 'fuelInitialState', label: t('additional.fuelInitialState') },
    { name: 'fuelEndState', label: t('additional.fuelEndState') },
    {
      name: 'aggregateInitialState',
      label: t('additional.aggregateInitialState'),
    },
    { name: 'aggregateAdBlue', label: t('additional.aggregateAdBlue') },
    { name: 'aggregateEndState', label: t('additional.aggregateEndState') },
    { name: 'avgFuelConsumption', label: t('additional.avgFuelConsumption') },
    {
      name: 'totalFuelConsumption',
      label: t('additional.totalFuelConsumption'),
    },
    { name: 'avgSpeed', label: t('additional.avgSpeed') },
    { name: 'fuelConsumptionIdle', label: t('additional.fuelConsumptionIdle') },
    {
      name: 'fuelConsumptionUneconomical',
      label: t('additional.fuelConsumptionUneconomical'),
    },
  ];

  const validation = Yup.object({
    fuelInitialState: Yup.string().required(t('yup.empty')),
    fuelEndState: Yup.string().required(t('yup.empty')),
    aggregateInitialState: Yup.string().required(t('yup.empty')),
    aggregateAdBlue: Yup.string().required(t('yup.empty')),
    aggregateEndState: Yup.string().required(t('yup.empty')),
    avgFuelConsumption: Yup.string().required(t('yup.empty')),
    totalFuelConsumption: Yup.string().required(t('yup.empty')),
    avgSpeed: Yup.string().required(t('yup.empty')),
    fuelConsumptionIdle: Yup.string().required(t('yup.empty')),
    fuelConsumptionUneconomical: Yup.string().required(t('yup.empty')),
  });

  const [visible, setVisible] = useState(false);
  const { generatePdf } = usePdfService();

  const formik = useFormik({
    initialValues: Object.fromEntries(inputs.map((field) => [field.name, ''])),
    validationSchema: validation,
    onSubmit: (values) => {
      generate(values);
    },
  });

  const generate = (additonalData) => {
    let pdfRequest = {
      number: cardNumber,
      cardTripsList: cardTrips,
      cardFuelsList: cardFuels,
      cardAdBlueList: cardAdBlue,
      info: additonalData,
    };

    generatePdf(user, pdfRequest, (progressEvent) => {
      setProgress(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
    }).then(
      (response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(file);
        link.download = cardNumber + '.pdf';
        link.click();
        setProgress(0);
      },
      (error) => {
        console.log('Error: ', error);
        if (error.response.status == 403) {
          setSnackbarInformation((prevState) => ({
            ...prevState,
            open: true,
            type: 'warning',
            message: t('pdf.warningCsvMessage'),
          }));
        } else {
          setSnackbarInformation((prevState) => ({
            ...prevState,
            open: true,
            type: 'warning',
            message: t('pdf.warningMessage'),
          }));
        }
        setProgress(0);
      }
    );
  };

  return (
    <div className="py-1">
      <Button
        onClick={() => setVisible((prevState) => !prevState)}
        variant="outlined"
        sx={{ fontWeight: 'bold', marginX: 1 }}
      >
        {t('pdf.genratePdfButton')}
      </Button>
      <div className={`py-2 ${visible ? 'hidden' : undefined}`}>
        <form onSubmit={formik.handleSubmit} className="text-center">
          <div className="flex">
            <div className="flex flex-col w-1/3">
              <h4 className="font-semibold">{t('additional.petrolHeader')}</h4>
              {inputs.slice(0, 2).map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[field.name] &&
                    Boolean(formik.errors[field.name])
                  }
                  helperText={
                    formik.touched[field.name] && formik.errors[field.name]
                  }
                  sx={{ margin: 1 }}
                />
              ))}
            </div>
            <div className="flex flex-col w-1/3">
              <h4 className="font-semibold">
                {t('additional.aggregateHeader')}
              </h4>
              {inputs.slice(2, 5).map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[field.name] &&
                    Boolean(formik.errors[field.name])
                  }
                  helperText={
                    formik.touched[field.name] && formik.errors[field.name]
                  }
                  sx={{ margin: 1 }}
                />
              ))}
            </div>
            <div className="flex flex-col w-1/3">
              <h4 className="font-semibold">{t('additional.tripHeader')}</h4>
              {inputs.slice(5, 10).map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[field.name] &&
                    Boolean(formik.errors[field.name])
                  }
                  helperText={
                    formik.touched[field.name] && formik.errors[field.name]
                  }
                  sx={{ margin: 1 }}
                />
              ))}
            </div>
          </div>
          <div className="text-right p-2">
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || !formik.dirty}
              sx={{ marginRight: 1, fontWeight: 'bold' }}
            >
              {t('addFuel.submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default GeneratePDFStepper;
