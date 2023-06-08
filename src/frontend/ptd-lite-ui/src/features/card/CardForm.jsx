import { useAddNewCardMutation, useUpdateCardMutation } from './cardSlice';
import { useAuth0 } from '@auth0/auth0-react';
import '../../css/cards.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  cardIdToUpdate,
  cardNumberToUpdate,
  isCardEditing,
  stopEditing,
  updateCardStatus,
} from './updateCardSlice';
import { useEffect } from 'react';

const schema = yup.object({
  number: yup
    .string()
    .min(3, 'Minimum 3 characters')
    .required('Cannot be empty'),
});

const CardForm = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const editStatus = useSelector(isCardEditing);
  const cardId = useSelector(cardIdToUpdate);
  const cardNumber = useSelector(cardNumberToUpdate);
  const [addNewCard, { isLoading }] = useAddNewCardMutation();
  const [updateCard] = useUpdateCardMutation();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      if (!editStatus) {
        let card = {
          number: data.number,
          username: user.nickname,
        };
        await addNewCard(card).unwrap();
      } else {
        let card = {
          id: cardId,
          number: data.number,
        };
        await updateCard(card).unwrap();
        dispatch(stopEditing(false));
      }
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

  useEffect(() => {
    if (editStatus) {
      setValue('number', cardNumber);
    }
  }, [editStatus]);

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
