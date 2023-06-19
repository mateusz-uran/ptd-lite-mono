import { Link } from 'react-router-dom';
import '../css/cards_mini.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetLastCardsQuery } from '../features/card/cardSlice';
import { useDispatch } from 'react-redux';
import { updateCardStatus } from '../features/card/updateCardSlice';
import { clearAdditionalData } from '../features/additional/additionalSlice';

const CardsMini = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const {
    data: lastCards,
    isSuccess,
    isError,
    isLoading,
  } = useGetLastCardsQuery(user.nickname);

  function storeSelectedCard(cardId) {
    localStorage.setItem('selected_card', Number(cardId));
    dispatch(clearAdditionalData());
  }

  const handleSingleCard = (id, number) => {
    var result = { id, number };
    dispatch(updateCardStatus(result));
  };

  if (!isLoading && !isError && isSuccess && lastCards?.length >= 1) {
    return (
      <section className="cards-mini">
        {lastCards.map((card, index) => (
          <ul key={index}>
            <li>
              <Link
                to={`${card.number}`}
                onClick={() => storeSelectedCard(card.id)}
              >
                {card.number}
              </Link>
              <button
                className="edit-button"
                onClick={() => handleSingleCard(card.id, card.number)}
              >
                <i className="bx bxs-edit edit"></i>
              </button>
            </li>
          </ul>
        ))}
      </section>
    );
  }

  if (isLoading && !isError) {
    return (
      <section className="cards-mini">
        <ul>
          <li className="empty-list">
            <span>Pending data</span>
          </li>
        </ul>
      </section>
    );
  }

  return (
    <section className="cards-mini">
      <ul>
        <li className="empty-list">
          <span>No data</span>
        </li>
      </ul>
    </section>
  );
};
export default CardsMini;
