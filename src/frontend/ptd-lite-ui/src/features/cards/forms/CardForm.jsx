import '../../../css/card_form.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cardIdToUpdate,
  cardNumberToUpdate,
  isCardEditing,
  stopEditing,
} from '../slices/updateCardSlice';
import { useEffect } from 'react';
import { MdSettingsBackupRestore } from 'react-icons/md';
import {
  useAddNewCardMutation,
  useUpdateCardMutation,
} from '../../../api/card/cardApiSlice';
import { useTranslation } from 'react-i18next';
import { translateCardInputs } from '../inputs/cardInputs';
import { translateCardValidations } from '../inputs/cardsValidations';
import LoadingDots from '../../../components/LoadingDots';
import SmallLoader from '../../../components/SmallLoader';

const CardForm = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const inputs = translateCardInputs();
  const cardSchema = translateCardValidations();

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
          number: data.cardNumber,
          username: user.nickname,
        };
        await addNewCard(card).unwrap();
      } else {
        let card = {
          id: cardId,
          number: data.cardNumber,
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
      setValue(inputs.name, cardNumber);
    }
  }, [editStatus, cardNumber]);

  return (
    <div className="card-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input
            type={inputs.type}
            name={inputs.name}
            placeholder={inputs.placeholder}
            {...register(inputs.name)}
            className="primary-input"
          />
          {errors[inputs.name]?.message && (
            <p className="error-input">{errors[inputs.name].message}</p>
          )}
          {errors?.number?.message && (
            <p className="error-input">{t('misc.cardExists')}</p>
          )}
        </div>
        <div className="button-wrapper">
          <div className="buttons">
            <button type="submit" disabled={isLoading} className="small-btn">
              {!isLoading ? (
                editStatus ? (
                  <span>{t('buttons.save')}</span>
                ) : (
                  <span>{t('buttons.add')}</span>
                )
              ) : (
                <SmallLoader />
              )}
            </button>
            <button
              type="button"
              className="small-btn revert-button"
              onClick={() => handleClearInput()}
              disabled={isLoading}
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
