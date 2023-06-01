import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../css/cards_mini.css';
import { useEffect } from 'react';
import {
  getLastThreeCards,
  getThreeCards,
  getThreeCardsStatus,
} from '../../features/card/cardMiniListSlice';
import {
  getToken,
  getTokenStatus,
  getUsername,
} from '../../features/auth/authSlice';

const CardsMini = () => {
  const dispatch = useDispatch();

  const cards = useSelector(getThreeCards);
  const status = useSelector(getThreeCardsStatus);
  const token = useSelector(getToken);
  const username = useSelector(getUsername);
  const loadingToken = useSelector(getTokenStatus);

  useEffect(() => {
    if (!status && !loadingToken) {
      dispatch(getLastThreeCards(token));
    }
  }, []);

  if (cards?.length > 1 && !status) {
    return (
      <section className="cards-mini">
        {cards.map((card, index) => (
          <ul key={index}>
            <li>
              <Link to={`${card.number}`}>{card.number}</Link>
            </li>
          </ul>
        ))}
      </section>
    );
  }

  if (status) {
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
