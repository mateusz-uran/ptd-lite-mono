import { Link } from 'react-router-dom';
import '../../css/cards_mini.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useGetLastCardsQuery } from '../../api/card/cardApiSlice';

const CardsMini = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const {
    data: lastCards,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetLastCardsQuery(user.nickname);

  function storeSelectedCard(cardId) {
    localStorage.setItem('selected_card', Number(cardId));
  }

  const cards = [
    { id: 1, number: 'abc123' },
    { id: 2, number: 'abc123' },
    { id: 3, number: 'abc123' },
  ];

  let cardsMiniList;

  if (isLoading) {
    cardsMiniList = (
      <section className="cards-mini loading">
        <div className="mini-loader">
          <div className="mini-spinner"></div>
        </div>
      </section>
    );
  }

  if (!isLoading && isSuccess) {
    cardsMiniList = (
      <section className="cards-mini">
        {
          (cardsMiniList = lastCards.map((card, index) => (
            <ul key={index}>
              <li>
                <Link to={`/home/cards/${card.number}`}>
                  <span onClick={() => storeSelectedCard(card.id)}>
                    {card.number}
                  </span>
                </Link>
              </li>
            </ul>
          )))
        }
      </section>
    );
  }

  if (!isLoading && isSuccess && lastCards?.length <= 0) {
    cardsMiniList = (
      <section className="cards-mini">
        <ul>
          <li>
            <span className="empty">No data</span>
          </li>
        </ul>
      </section>
    );
  }

  if (isError) {
    cardsMiniList = (
      <section className="cards-mini">
        <ul>
          <li>
            <span className="empty">Error</span>
          </li>
        </ul>
      </section>
    );
  }

  return cardsMiniList;
};
export default CardsMini;
