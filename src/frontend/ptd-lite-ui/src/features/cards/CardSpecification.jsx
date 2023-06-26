import '../../css/card_spec.css';
import { useParams } from 'react-router-dom';
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
    console.log(cardDeletePayload);
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
            <button className="pdf-button">Download pdf</button>
            <button onClick={handleDeleteCard}>Delete</button>
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
