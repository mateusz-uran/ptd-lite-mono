import { useParams } from 'react-router-dom';
import '../css/card_item.css';
import TripTable from './TripTable';
import PetrolTable from './PetrolTable';
import AdBlueTable from './AdBlueTable';
import CardForm from '../features/card/CardForm';
import { useAuth0 } from '@auth0/auth0-react';
import AdditionalInfo from '../features/additional/AdditionalInfo';

const CardItem = () => {
  const { user } = useAuth0();
  const { cardNumber } = useParams();
  const selectedCard = localStorage.getItem('selected_card');

  let section = (
    <section className="success-section">
      <header>
        <div>
          <h4>Card</h4>
          <CardForm />
        </div>
        <button className="pdf-button">
          <i className="bx bxs-cloud-download icon"></i>
          <span className="text">Download PDF</span>
        </button>
      </header>
      <div className="tables-wrapper">
        <div className="trip">
          <h5>Trips</h5>
          <TripTable cardId={selectedCard} />
        </div>
        <div className="fuel">
          <div className="petrol">
            <PetrolTable cardId={selectedCard} />
          </div>
          <div className="adblue">
            <AdBlueTable cardId={selectedCard} />
          </div>
        </div>
        <div className="final-content">
          <AdditionalInfo />
        </div>
      </div>
    </section>
  );

  return (
    <main className="card-item">
      <header className="comp-header">
        <i className="bx bx-home-alt icon"></i>
        <i className="bx bx-chevron-right icon-right"></i>
        <span>Card</span>
        <i className="bx bx-chevron-right icon-right"></i>
        <span>{cardNumber}</span>
      </header>
      {section}
    </main>
  );
};
export default CardItem;
