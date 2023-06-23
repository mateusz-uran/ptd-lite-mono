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
import { openModal } from '../features/modal/modalSlice';

const Cards = () => {
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
        <div className="single-card loading">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  if (isError) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card error">
          <span>Server is not available at the moment. Try again later.</span>
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
            <button onClick={() => navigate(`${card.number}/${card.id}`)}>
              Browse
            </button>
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

  if (isSuccess && lastCards?.length <= 0) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card error">
          <span>No data, add new card.</span>
        </div>
      </div>
    );
  }

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
