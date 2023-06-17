import { useAddNewCardMutation, useUpdateCardMutation } from './cardSlice';
import { useAuth0 } from '@auth0/auth0-react';
import '../../css/cards.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  cardIdToUpdate,
  cardNumberToUpdate,
  isCardEditing,
  stopEditing,
} from './updateCardSlice';
import { useEffect } from 'react';
import { cardSchema } from './yupSchema';

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
  } = useForm({ resolver: yupResolver(cardSchema) });

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

  const handleClearInput = () => {
    if (editStatus) {
      dispatch(stopEditing(false));
    }
    reset();
  };

  useEffect(() => {
    if (editStatus) {
      setValue('number', cardNumber);
    }
  }, [editStatus, cardNumber]);

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
        <div className="button-wrapper">
          <button type="submit" disabled={isLoading}>
            Save
          </button>
          <button
            type="button"
            className="revert-button"
            onClick={() => handleClearInput()}
          >
            <i className="bx bx-reset revert"></i>
          </button>
        </div>
      </form>
    </section>
  );
};
export default CardForm;
