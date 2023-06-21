import { Link } from 'react-router-dom';

const CardsMini = () => {
  let isLoading = false;
  let isSuccess = true;

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
          (cardsMiniList = cards.map((card, index) => (
            <ul key={index}>
              <li>
                <Link>
                  <span>{card.number}</span>
                </Link>
              </li>
            </ul>
          )))
        }
      </section>
    );
  }

  if (!isLoading && cards.length <= 0) {
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
