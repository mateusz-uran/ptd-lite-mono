import '../../css/fuel_form.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSavePetrolMutation } from '../petrol/petrolSlice';
import { useSaveAdBlueMutation } from '../adBlue/blueSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closeFuelForm, componentName } from './fuelFormSlice';

const FuelForm = ({ inputs, schema, cardId, target }) => {
  const dispatch = useDispatch();

  const [savePetrol] = useSavePetrolMutation();
  const [saveAdBlue] = useSaveAdBlueMutation();
  const component = useSelector(componentName);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    if (component === 'petrol') {
      let fuelPayload = {
        cardId: cardId,
        petrol: data,
      };
      await savePetrol(fuelPayload).unwrap();
      console.log('Petrol: ', fuelPayload);
    } else if (component === 'blue') {
      let fuelPayload = {
        cardId: cardId,
        blue: data,
      };
      console.log('Blue: ', fuelPayload);
      await saveAdBlue(fuelPayload).unwrap();
    }
    dispatch(closeFuelForm());
  };

  return (
    <section className="fuel-form">
      <div className="close-button-wrapper">
        <button onClick={() => dispatch(closeFuelForm())}>
          <i className="bx bx-x close"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fields-wrapper">
          {inputs.map((input, index) => (
            <div key={index} className="single-input">
              <input
                type={input.type}
                placeholder={input.placeholder}
                id={input.name}
                {...register(input.name)}
                style={{ minWidth: input?.width }}
              />
              <label htmlFor={input.name}>{input.label}</label>
              {errors[input.name] && <p>{errors[input.name].message}</p>}
            </div>
          ))}
        </div>
        <div className="button-wrapper">
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};
export default FuelForm;
