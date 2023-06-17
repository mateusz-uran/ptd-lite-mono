import { useFieldArray, useForm } from 'react-hook-form';
import '../../css/trip_form.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './yupSchema';
import inputs from './tripInputs';
import { useNavigate, useParams } from 'react-router-dom';
import { useSaveTripsMutation } from './tripApiSlice';

const TripForm = () => {
  const selectedCard = localStorage.getItem('selected_card');
  const navigate = useNavigate();
  const { cardNumber } = useParams();
  const [saveTrips] = useSaveTripsMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
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
        cardId: selectedCard,
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
    <section className="trip-form">
      <header className="comp-header trip-form-header">
        <i className="bx bx-home-alt icon"></i>
        <i className="bx bx-chevron-right icon-right"></i>
        <span>Card</span>
        <i className="bx bx-chevron-right icon-right"></i>
        <span>{cardNumber}</span>
        <i className="bx bx-chevron-left icon-right"></i>
        <button onClick={() => navigate(-1)}>Back</button>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="fields-wrapper">
            <div className="inputs-wrapper">
              <div className="start-wrapper">
                <h5>start</h5>
                <div className="inputs">
                  {inputs.slice(0, 5).map((input) => (
                    <div key={input.name} className="single-input">
                      <input
                        placeholder={input.placeholder}
                        type={input.type}
                        {...register(`inputs.${index}.${input.name}`)}
                        defaultValue={field[input.name] || ''}
                        style={{ minWidth: input?.width }}
                      />
                      <label>{input.label}</label>
                      <p>{errors?.inputs?.[index]?.[input.name]?.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="end-wrapper">
                <h5>end</h5>
                <div className="inputs">
                  {inputs.slice(5).map((input) => (
                    <div key={input.name} className="single-input">
                      <input
                        placeholder={input.placeholder}
                        type={input.type}
                        {...register(`inputs.${index}.${input.name}`)}
                        defaultValue={field[input.name] || ''}
                        style={{ minWidth: input?.width }}
                      />
                      <label>{input.label}</label>
                      <p>{errors?.inputs?.[index]?.[input.name]?.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <i className="bx bx-minus-circle remove"></i>
            </button>
          </div>
        ))}

        <div className="form-buttons">
          <button type="button" onClick={handleAddRow}>
            <i className="bx bxs-down-arrow add-row"></i>
          </button>

          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};
export default TripForm;
