import { useParams } from 'react-router-dom';
import { useGetCardsDetailsQuery } from '../features/card/cardSlice';
import '../css/card_item.css';
import TripTable from './TripTable';
import PetrolTable from './PetrolTable';
import AdBlueTable from './AdBlueTable';
import CardForm from '../features/card/CardForm';
import { useGetTripsByCardIdQuery } from '../features/trip/tripSlice';
import { useGetPetrolByCardIdQuery } from '../features/petrol/petrolSlice';
import { useGetBlueByCardIdQuery } from '../features/adBlue/blueSlice';

const CardItem = () => {
  const { cardNumber } = useParams();
  const selectedCard = localStorage.getItem('selected_card');

  const {
    data: card,
    isLoading,
    isSuccess,
    isError,
  } = useGetCardsDetailsQuery(selectedCard);

  const { data: trips } = useGetTripsByCardIdQuery(selectedCard);
  const { data: petrol } = useGetPetrolByCardIdQuery(selectedCard);
  const { data: blue } = useGetBlueByCardIdQuery(selectedCard);

  let section;
  if (isLoading) {
    section = <section>Loading card details...</section>;
  } else if (isError) {
    section = <section>Card is not available at the moment.</section>;
  } else if (isSuccess) {
    section = (
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
            <TripTable trips={card.trips} />
          </div>
          <div className="fuel">
            <div className="petrol">
              <PetrolTable petrol={card.fuels} />
            </div>
            <div className="adblue">
              <AdBlueTable adBlue={card.blue} />
            </div>
          </div>
          <div className="final-content">additional info</div>
        </div>
      </section>
    );
  }

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
