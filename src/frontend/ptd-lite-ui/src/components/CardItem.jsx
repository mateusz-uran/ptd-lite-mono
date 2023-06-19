import { useParams } from 'react-router-dom';
import '../css/card_item.css';
import TripTable from './TripTable';
import PetrolTable from './PetrolTable';
import AdBlueTable from './AdBlueTable';
import CardForm from '../features/card/CardForm';
import AdditionalInfo from '../features/additional/AdditionalInfo';
import { useState } from 'react';
import GenerateSinglePdf from '../features/pdf/GenerateSinglePdf';

const CardItem = () => {
  const { cardNumber } = useParams();
  const selectedCard = localStorage.getItem('selected_card');

  const [visible, setVisible] = useState(false);

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
          <div className="pdf-button">
            <GenerateSinglePdf cardId={selectedCard} page={'second'} />
            <h5>Trips</h5>
          </div>
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
          {visible && <AdditionalInfo />}
          <div className={`button-wrapper ${visible ? 'visible' : undefined}`}>
            <button onClick={() => setVisible((prevState) => !prevState)}>
              <i className="bx bxs-chevron-down"></i>
            </button>
          </div>
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
