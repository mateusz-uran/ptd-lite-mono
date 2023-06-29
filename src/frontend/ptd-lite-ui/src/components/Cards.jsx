import CardForm from '../features/cards/CardForm';
import Header from './Header';
import '../css/cards.css';
import { Link, useNavigate } from 'react-router-dom';
import { useGetLastCardsQuery } from '../api/card/cardApiSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isCardEditing,
  updateCardStatus,
} from '../features/cards/updateCardSlice';
import { openModal } from '../features/modal/modalSlice';
import LoadingDots from './LoadingDots';
import { useTranslation } from 'react-i18next';

const Cards = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  let cards;
  const isEditing = useSelector(isCardEditing);
  const {
    data: lastCards,
    isSuccess,
    isError,
    isLoading,
  } = useGetLastCardsQuery(user.nickname);

  const handleSingleCard = (cardId, cardNumber) => {
    var payload = {
      selectedCard: cardId,
      cardNumber: cardNumber,
    };
    dispatch(updateCardStatus(payload));
  };

  if (isLoading) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card">
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (isError) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card error">
          <span>{t('misc.errorMessage')}</span>
        </div>
      </div>
    );
  }

  if (isSuccess && lastCards?.length >= 1) {
    const formattedCards = lastCards.map((card) => {
      const creationTime = card.creationTime;
      const formattedDate = new Date(creationTime).toISOString().split('T')[0];

      return {
        ...card,
        creationTime: formattedDate,
      };
    });

    const handleDeleteCard = (cardId) => {
      let cardDeletePayload = {
        cardId: cardId,
        message: t('misc.modalMessage'),
      };
      dispatch(openModal(cardDeletePayload));
    };

    cards = formattedCards.map((card, index) => (
      <div key={index} className="card-wrapper">
        <div className="single-card">
          <div className="details-wrapper">
            <span>
              <p>{t('misc.number')}:</p>{' '}
              <p className="content">{card.number}</p>
            </span>
            <span>
              {t('misc.creationTime')}:&nbsp;
              <p className="content">{card.creationTime}</p>
            </span>
          </div>
          <div className="buttons-wrapper">
            <Link to={`${card.number}/${card.id}`}>
              <button className="primary-btn">{t('buttons.browse')}</button>
            </Link>
            <Link to={`${card.number}/${card.id}/add/trip`}>
              <button className="primary-btn">{t('buttons.addTrip')}</button>
            </Link>
            <Link to={`${card.number}/${card.id}/add/${'petrol'}`}>
              <button className="primary-btn">{t('buttons.addPetrol')}</button>
            </Link>
            <Link to={`${card.number}/${card.id}/add/${'blue'}`}>
              <button className="primary-btn">{t('buttons.addBlue')}</button>
            </Link>
            <button
              onClick={() => handleSingleCard(card.id, card.number)}
              className="primary-btn edit"
            >
              {t('buttons.editNumber')}
            </button>
            <button
              onClick={() => handleDeleteCard(card.id)}
              className="primary-btn delete"
            >
              {t('buttons.deleteCard')}
            </button>
          </div>
        </div>
      </div>
    ));
  }

  if (isSuccess && lastCards?.length <= 0) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card error">
          <span>{t('misc.noCards')}.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        compArray={[
          {
            compName: t('misc.cards'),
          },
        ]}
      />
      <section className="cards-section">
        <span className="h-section">
          <p className={`${!isEditing ? 'edit' : ''}`}>
            {t('buttons.smallAdd')}
          </p>
          <span>&nbsp;/&nbsp;</span>
          <p className={`${isEditing ? 'edit' : ''}`}>
            {t('buttons.smallEdit')}
          </p>
          <span>{t('misc.card')}</span>
        </span>
        <CardForm />
        {cards}
      </section>
    </div>
  );
};
export default Cards;
