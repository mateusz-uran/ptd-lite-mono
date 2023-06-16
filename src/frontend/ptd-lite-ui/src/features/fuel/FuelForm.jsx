import '../../css/fuel_form.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  getPetrolSelectors,
  useSavePetrolMutation,
  useUpdatePetrolMutation,
} from '../petrol/petrolSlice';
import { useSaveAdBlueMutation } from '../adBlue/blueSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeFuelForm,
  componentName,
  isEditingFuel,
  petrolIdToEdit,
} from './fuelFormSlice';
import { useEffect } from 'react';

const FuelForm = ({ inputs, schema, cardId }) => {
  const dispatch = useDispatch();

  const [savePetrol] = useSavePetrolMutation();
  const [updatePetrol] = useUpdatePetrolMutation();

  const [saveAdBlue] = useSaveAdBlueMutation();

  const { selectById: selectSinglePetrol } = getPetrolSelectors(cardId);
  const editStatus = useSelector(isEditingFuel);
  const petrolId = useSelector(petrolIdToEdit);
  const petrol = useSelector(selectSinglePetrol(petrolId));
  const component = useSelector(componentName);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    if (component === 'petrol') {
      if (editStatus) {
        let fuelPayload = {
          fuelId: petrolId,
          petrol: data,
        };
        await updatePetrol(fuelPayload).unwrap();
      } else {
        let fuelPayload = {
          cardId: cardId,
          petrol: data,
        };
        await savePetrol(fuelPayload).unwrap();
      }
    } else if (component === 'blue') {
      let fuelPayload = {
        cardId: cardId,
        blue: data,
      };
      await saveAdBlue(fuelPayload).unwrap();
    }
    dispatch(closeFuelForm());
  };

  useEffect(() => {
    if (editStatus && petrol) {
      console.log(petrol);
      // Set initial values for each field
      Object.keys(petrol).forEach((fieldName) => {
        setValue(fieldName, petrol[fieldName]);
      });
    }
  }, [editStatus, petrol]);

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
