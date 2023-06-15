import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useSavePetrolMutation } from '../petrol/petrolSlice';
import { useSaveAdBlueMutation } from '../adBlue/blueSlice';
import petrolInputs from './petrolInputs';
import blueInputs from './blueInputs';
import { petrolSchema, adBlueSchema } from './yupSchema';

const FuelForm = () => {
  const { target, cardId } = useParams();
  const navigate = useNavigate();

  const [savePetrol] = useSavePetrolMutation();
  const [saveAdBlue] = useSaveAdBlueMutation();

  //validate form based on URL
  let schema;
  let inputs;
  if (target === 'petrol') {
    schema = petrolSchema;
    inputs = petrolInputs;
  } else if (target === 'blue') {
    schema = adBlueSchema;
    inputs = blueInputs;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (target === 'petrol') {
      let fuelPayload = {
        cardId: cardId,
        petrol: data,
      };
      await savePetrol(fuelPayload).unwrap();
    } else if (target === 'blue') {
      let fuelPayload = {
        cardId: cardId,
        blue: data,
      };
      await saveAdBlue(fuelPayload).unwrap();
    }
    navigate(-1);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input, index) => (
          <div key={index}>
            <label htmlFor={input.name}>{input.label}</label>
            <input
              type={input.type}
              id={input.name}
              {...register(input.name)}
            />
            {errors[input.name] && <p>{errors[input.name].message}</p>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
export default FuelForm;
