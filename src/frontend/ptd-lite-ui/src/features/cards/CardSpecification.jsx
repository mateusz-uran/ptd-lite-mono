import '../../css/card_spec.css';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { openModal } from '../modal/modalSlice';
import TripTable from '../../components/trip-table/TripTable';
import PetrolTable from '../../components/petrol-table/PetrolTable';
import AdBlueTable from '../../components/adblue/AdBlueTable';

const CardSpecification = () => {
  const dispatch = useDispatch();
  const { cardNumber, cardId } = useParams();

  const handleDeleteCard = () => {
    let cardDeletePayload = {
      cardId: Number(cardId),
      message: 'Are you sure? All data will be erased.',
    };
    dispatch(openModal(cardDeletePayload));
  };

  return (
    <div className="card-spec">
      <Header
        compArray={[
          {
            compName: 'Cards',
          },
          {
            compName: cardNumber,
          },
        ]}
      />
      <section className="card-spec-section">
        <div className="card-manage">
          <h5>Manage</h5>
          <div className="buttons-wrapper">
            <button className="primary-btn pdf-button">Download pdf</button>
            <Link to={`/home/cards/${cardNumber}/${cardId}/add/trip`}>
              <button className="primary-btn">Add trips</button>
            </Link>
            <Link to={`/home/cards/${cardNumber}/${cardId}/add/${'petrol'}`}>
              <button className="primary-btn">Add petrol</button>
            </Link>
            <Link to={`/home/cards/${cardNumber}/${cardId}/add/${'blue'}`}>
              <button className="primary-btn">Add adBlue</button>
            </Link>
            <button onClick={handleDeleteCard} className="primary-btn delete">
              Delete
            </button>
          </div>
        </div>
        <div className="card-spec-table">
          <TripTable cardId={cardId} />
        </div>
        <div className="card-spec-table">
          <PetrolTable cardId={cardId} />
        </div>
        <div className="card-spec-table">
          <AdBlueTable cardId={cardId} />
        </div>
        <div>additional information</div>
      </section>
    </div>
  );
};
export default CardSpecification;
