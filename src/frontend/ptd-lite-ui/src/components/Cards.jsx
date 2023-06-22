import CardForm from '../features/cards/CardForm';
import Header from './Header';
import '../css/cards.css';
import { useNavigate } from 'react-router-dom';
import { useGetLastCardsQuery } from '../api/card/cardApiSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isCardEditing,
  updateCardStatus,
} from '../features/cards/updateCardSlice';
import { isModalOpen, openModal } from '../features/modal/modalSlice';
import Modal from '../features/modal/Modal';

const Cards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const {
    data: lastCards,
    isSuccess,
    isError,
    isLoading,
  } = useGetLastCardsQuery(user.nickname);

  let cards;

  if (isLoading) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card loading">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  if (isSuccess) {
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
        message: 'Are you sure? All data will be erased.',
      };
      dispatch(openModal(cardDeletePayload));
    };

    cards = formattedCards.map((card, index) => (
      <div key={index} className="card-wrapper">
        <div className="single-card">
          <div className="details-wrapper">
            <span>
              <p>Number:</p> <p className="content">{card.number}</p>
            </span>
            <span>
              Creation time:&nbsp;
              <p className="content">{card.creationTime}</p>
            </span>
          </div>
          <div className="buttons-wrapper">
            <button onClick={() => navigate(`${card.number}`)}>Browse</button>
            <button>Add trip</button>
            <button>Add petrol</button>
            <button>Add adBlue</button>
            <button onClick={() => handleSingleCard(card.id, card.number)}>
              Edit number
            </button>
            <button onClick={() => handleDeleteCard(card.id)}>
              Delete card
            </button>
          </div>
        </div>
      </div>
    ));
  }

  const isEditing = useSelector(isCardEditing);

  const handleSingleCard = (cardId, cardNumber) => {
    var payload = {
      selectedCard: cardId,
      cardNumber: cardNumber,
    };
    dispatch(updateCardStatus(payload));
  };

  return (
    <div>
      <Header
        compArray={[
          {
            compName: 'Cards',
          },
        ]}
      />
      <section className="cards-section">
        <span className="h-section">
          <p className={`${!isEditing ? 'edit' : ''}`}>Add</p>
          <span>&nbsp;/&nbsp;</span>
          <p className={`${isEditing ? 'edit' : ''}`}>Edit</p>
          <span>card</span>
        </span>
        <CardForm />
        {cards}
      </section>
    </div>
  );
};
export default Cards;
