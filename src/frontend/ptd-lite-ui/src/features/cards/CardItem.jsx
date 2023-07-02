import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openModal } from '../modal/modalSlice';
import { Link } from 'react-router-dom';
import { updateCardStatus } from './updateCardSlice';

const CardItem = ({ cards, compName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formattedCards = cards.map((card) => {
    const creationTime = card.creationTime;
    const formattedDate = new Date(creationTime).toISOString().split('T')[0];

    return {
      ...card,
      creationTime: formattedDate,
    };
  });

  const handleSingleCard = (cardId, cardNumber) => {
    var payload = {
      selectedCard: cardId,
      cardNumber: cardNumber,
    };
    dispatch(updateCardStatus(payload));
  };

  const handleDeleteCard = (cardId) => {
    let cardDeletePayload = {
      cardId: cardId,
      message: t('misc.modalMessage'),
    };
    dispatch(openModal(cardDeletePayload));
  };

  function storeSelectedCard(cardId) {
    localStorage.setItem('selected_card', Number(cardId));
  }

  return formattedCards.map((card, index) => (
    <div key={index} className="card-wrapper">
      <div className="single-card">
        <div className="details-wrapper">
          <span>
            <p>{t('misc.number')}:</p> <p className="content">{card.number}</p>
          </span>
          <span>
            {t('misc.creationTime')}:&nbsp;
            <p className="content">{card.creationTime}</p>
          </span>
        </div>
        <div className="buttons-wrapper">
          <Link
            to={`/home/${compName}/${encodeURIComponent(card.number)}/${
              card.id
            }`}
          >
            <button
              onClick={() => storeSelectedCard(card.id)}
              className="primary-btn"
            >
              {t('buttons.browse')}
            </button>
          </Link>
          <Link to={`/home/${compName}/${card.number}/${card.id}/add/trip`}>
            <button className="secondary-btn">{t('buttons.addTrip')}</button>
          </Link>
          <Link
            to={`/home/${compName}/${card.number}/${card.id}/add/${'petrol'}`}
          >
            <button className="secondary-btn">{t('buttons.addPetrol')}</button>
          </Link>
          <Link
            to={`/home/${compName}/${card.number}/${card.id}/add/${'blue'}`}
          >
            <button className="secondary-btn">{t('buttons.addBlue')}</button>
          </Link>
          <button
            onClick={() => handleSingleCard(card.id, card.number)}
            className="secondary-btn edit"
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
};
export default CardItem;
