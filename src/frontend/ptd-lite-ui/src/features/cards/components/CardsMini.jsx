import { Link } from 'react-router-dom';
import '../../css/cards_mini.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetLastCardsQuery } from '../../api/card/cardApiSlice';
import { useTranslation } from 'react-i18next';

const CardsMini = () => {
  const { t } = useTranslation();
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
            <span className="empty">{t('misc.cardsMiniError')}</span>
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
                <Link
                  to={`/home/cards/${encodeURIComponent(card.number)}/${
                    card.id
                  }`}
                >
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
            <span className="empty">{t('misc.cardsMiniNoData')}</span>
          </li>
        </ul>
      </section>
    );
  }

  return cardsMiniList;
};
export default CardsMini;
