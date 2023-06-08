import { useAddNewCardMutation } from './cardSlice';
import { useAuth0 } from '@auth0/auth0-react';
import '../../css/cards.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  number: yup
    .string()
    .min(3, 'Minimum 3 characters')
    .required('Cannot be empty'),
});

const CardForm = () => {
  const { user } = useAuth0();
  const [addNewCard, { isLoading }] = useAddNewCardMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      let card = {
        number: data.number,
        username: user.nickname,
      };
      await addNewCard(card).unwrap();
      reset();
    } catch (err) {
      console.log(err);
      if (err.status === 409) {
        setError('number', {
          type: 'server',
          message: err.data.description,
        });
      }
    }
  };

  return (
    <section className="card-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input
            type="text"
            name="cardNumber"
            placeholder="number"
            {...register('number', { required: true, minLength: 3 })}
          />
          <label htmlFor="cardNumber">Number</label>
          {errors.number?.message && <p>{errors.number?.message}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          Save
        </button>
      </form>
    </section>
  );
};
export default CardForm;
