import { Link } from 'react-router-dom';
import '../../css/cards_mini.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetLastCardsQuery } from '../../api/card/cardApiSlice';

const CardsMini = () => {
  const { user } = useAuth0();

  const {
    data: lastCards,
    isSuccess,
    isError,
    isLoading,
  } = useGetLastCardsQuery(user.nickname);

  function storeSelectedCard(cardId) {
    localStorage.setItem('selected_card', Number(cardId));
  }

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

  if (isSuccess) {
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

  if (isSuccess && lastCards?.length <= 0) {
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

  return cardsMiniList;
};
export default CardsMini;
