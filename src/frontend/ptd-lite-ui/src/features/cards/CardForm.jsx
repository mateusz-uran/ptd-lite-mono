import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cardIdToUpdate,
  cardNumberToUpdate,
  isCardEditing,
  stopEditing,
} from './updateCardSlice';
import { useEffect } from 'react';
import '../../css/card_form.css';
import { MdSettingsBackupRestore } from 'react-icons/md';
import {
  useAddNewCardMutation,
  useUpdateCardMutation,
} from '../../api/card/cardApiSlice';
import { useTranslation } from 'react-i18next';

export const cardSchema = yup.object({
  number: yup
    .string()
    .min(3, 'Minimum 3 characters')
    .required('Cannot be empty'),
});

const CardForm = () => {
  const { t } = useTranslation();
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
    <div className="card-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input
            type="text"
            name="cardNumber"
            placeholder="number"
            {...register('number', { required: true, minLength: 3 })}
            className="primary-input"
          />
          {errors.number?.message && (
            <p className="error-input">{errors.number?.message}</p>
          )}
        </div>
        <div className="button-wrapper">
          <div className="buttons">
            <button type="submit" disabled={isLoading} className="small-btn">
              {editStatus ? (
                <span>{t('buttons.save')}</span>
              ) : (
                <span>{t('buttons.add')}</span>
              )}
            </button>
            <button
              type="button"
              className="small-btn revert-button"
              onClick={() => handleClearInput()}
            >
              <MdSettingsBackupRestore className="revert" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CardForm;
