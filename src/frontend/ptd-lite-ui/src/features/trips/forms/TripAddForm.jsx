import { IoIosRemove } from 'react-icons/io';
import { GrFormAdd } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import { translatedTripArraySchema } from '../inputs/tripValidations';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSaveTripsMutation } from '../../../api/trips/tripsApiSlice';
import { translateTripInputs } from '../inputs/tripInputs';
import { useTranslation } from 'react-i18next';

const TripAddForm = () => {
  const { t } = useTranslation();
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [saveTrips] = useSaveTripsMutation();
  const tripInputs = translateTripInputs();

  const tripSchemaArray = translatedTripArraySchema();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tripSchemaArray),
    defaultValues: {
      inputs: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inputs',
  });

  const onSubmit = async (data) => {
    try {
      let tripPayload = {
        cardId: cardId,
        trips: data.inputs,
      };
      await saveTrips(tripPayload).unwrap();
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddRow = () => {
    const lastIndex = fields.length - 1;
    const lastRowValues = getValues(`inputs[${lastIndex}]`);

    const newRow = {
      locationStart: lastRowValues.locationEnd || '',
      countryStart: lastRowValues.countryEnd || '',
      counterStart: lastRowValues.counterEnd || '',
      locationEnd: '',
      countryEnd: '',
      counterEnd: '',
    };

    append(newRow);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper trips">
      {fields.map((field, index) => (
        <div key={field.id} className="fields-wrapper">
          <div className="inputs-wrapper">
            <div className="start">
              <h5>{t('misc.tripStart')}</h5>
              <div className="inputs">
                {tripInputs.slice(0, 5).map((input) => (
                  <div key={input.name} className="single-input">
                    <input
                      placeholder={input.placeholder}
                      type={input.type}
                      {...register(`inputs.${index}.${input.name}`)}
                      defaultValue={field[input.name] || ''}
                      className="primary-input"
                    />
                    {errors.inputs?.[index] && (
                      <p className="error-input trip-error">
                        {errors.inputs?.[index]?.[input.name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="end">
              <h5>{t('misc.tripEnd')}</h5>
              <div className="inputs">
                {tripInputs.slice(5).map((input) => (
                  <div key={input.name} className="single-input">
                    <input
                      placeholder={input.placeholder}
                      type={input.type}
                      {...register(`inputs.${index}.${input.name}`)}
                      defaultValue={field[input.name] || ''}
                      className="primary-input"
                    />
                    {errors.inputs?.[index] && (
                      <p className="error-input trip-error">
                        {errors.inputs?.[index]?.[input.name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            className="small-btn remove"
          >
            <IoIosRemove />
          </button>
        </div>
      ))}

      <div className="buttons-wrapper">
        <button type="button" onClick={handleAddRow} className="small-btn add">
          <GrFormAdd />
        </button>

        <button type="submit" className="primary-btn submit">
          {t('buttons.submit')}
        </button>
      </div>
    </form>
  );
};
export default TripAddForm;
