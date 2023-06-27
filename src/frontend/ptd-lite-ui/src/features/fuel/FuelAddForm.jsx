import '../../css/fuel_form.css';
import { IoIosRemove } from 'react-icons/io';
import { GrFormAdd } from 'react-icons/gr';
import { useFieldArray, useForm } from 'react-hook-form';
import { blueInputs, petrolInputs } from './fuelInputs';
import { adBlueArraySchema, petrolArraySchema } from './fuelValidations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useSavePetrolMutation } from '../../api/petrol/petrolApiSlice';
import { useSaveAdBlueMutation } from '../../api/adblue/adBlueApiSlice';

const FuelAddForm = () => {
  const { cardId, type } = useParams();
  const navigate = useNavigate();
  let inputs;
  let fieldSchema;

  if (type === 'petrol') {
    inputs = petrolInputs;
    fieldSchema = petrolArraySchema;
  } else if (type === 'blue') {
    inputs = blueInputs;
    fieldSchema = adBlueArraySchema;
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fieldSchema),
    defaultValues: {
      inputs: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inputs',
  });

  const [savePetrol] = useSavePetrolMutation();
  const [saveAdBlue] = useSaveAdBlueMutation();
  const onSubmit = async (data) => {
    let fuelPayload = {};
    if (type === 'petrol') {
      fuelPayload = {
        cardId: cardId,
        petrol: data.inputs,
      };
      await savePetrol(fuelPayload).unwrap();
    } else if (type === 'blue') {
      fuelPayload = {
        cardId: cardId,
        blue: data.inputs,
      };
      await saveAdBlue(fuelPayload).unwrap();
    }
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fuel-form">
      {fields.map((field, index) => (
        <div key={field.id} className="fields-wrapper">
          <div className="inputs-wrapper">
            {inputs.map((input) => (
              <div key={input.name} className="single-input">
                <input
                  placeholder={input.placeholder}
                  type={input.type}
                  {...register(`inputs.${index}.${input.name}`)}
                  defaultValue={field[input.name] || ''}
                  className="primary-input"
                />
                {errors.inputs?.[index] && (
                  <p className="error-input">
                    {errors.inputs?.[index]?.[input.name]?.message}
                  </p>
                )}
              </div>
            ))}
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
        <button
          type="button"
          onClick={() => append()}
          className="small-btn add"
        >
          <GrFormAdd />
        </button>

        <button type="submit" className="primary-btn submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default FuelAddForm;
