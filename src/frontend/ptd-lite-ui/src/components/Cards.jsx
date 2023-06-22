import CardForm from '../features/cards/CardForm';
import Header from './Header';
import '../css/cards.css';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const navigate = useNavigate();
  const cards = [
    { id: 1, number: 'abc123', creationTime: '2023-06-13 13:35:12' },
    { id: 2, number: 'zxy532', creationTime: '2023-06-20 18:11:59' },
    { id: 3, number: 'wod654', creationTime: '2023-06-22 8:45:08' },
  ];

  const formattedCards = cards.map((card) => {
    const creationTime = card.creationTime;
    const formattedDate = new Date(creationTime).toISOString().split('T')[0];

    return {
      ...card,
      creationTime: formattedDate,
    };
  });

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
        <span className="h-section">Add new card</span>
        <CardForm />
        {formattedCards.map((card, index) => (
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
                <button onClick={() => navigate(`${card.number}`)}>
                  Browse
                </button>
                <button>Add trip</button>
                <button>Add petrol</button>
                <button>Add adBlue</button>
                <button>Delete card</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default Cards;
