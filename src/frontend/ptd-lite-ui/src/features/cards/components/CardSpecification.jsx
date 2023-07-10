import '../../../css/card_spec.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import TripTable from '../../trips/components/TripTable';
import { useTranslation } from 'react-i18next';
import { selectedTripArray } from '../../trips/slices/tripSelectedSlice';
import { openModal } from '../../modal/slices/modalSlice';
import PetrolTable from '../../fuel/components/PetrolTable';
import AdBlueTable from '../../fuel/components/AdBlueTable';
import AdditionalInformation from '../../additionalInfo/AdditionalInformation';
import GeneratePDF from '../../pdf/components/GeneratePDF';

const CardSpecification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { cardNumber, cardId } = useParams();
  const navigate = useNavigate();
  const selectedTrips = useSelector(selectedTripArray);

  const containsGroup = selectedTrips.some(
    (item) => item.group && item.group !== null
  );

  const handleDeleteCard = () => {
    let cardDeletePayload = {
      cardId: Number(cardId),
      message: t('misc.modalMessage'),
    };
    dispatch(openModal(cardDeletePayload));
    navigate(-1);
  };

  return (
    <div className="card-spec">
      <Header
        compArray={[
          {
            compName: t('misc.cards'),
          },
          {
            compName: cardNumber,
          },
        ]}
      />
      <section className="card-spec-section">
        <div className="card-manage">
          <h5>{t('misc.manage')}</h5>
          <div className="buttons-wrapper">
            <GeneratePDF />
            <Link to={`${location.pathname}/add/trip`}>
              <button className="secondary-btn">{t('buttons.addTrip')}</button>
            </Link>
            <Link to={`${location.pathname}/add/${'petrol'}`}>
              <button className="secondary-btn">
                {t('buttons.addPetrol')}
              </button>
            </Link>
            <Link to={`${location.pathname}/add/${'blue'}`}>
              <button className="secondary-btn">{t('buttons.addBlue')}</button>
            </Link>
            <Link
              to={'createcargo'}
              className={`cargo-link ${
                selectedTrips?.length <= 0 || containsGroup
                  ? 'inactive'
                  : undefined
              }`}
            >
              <button
                className="secondary-btn"
                disabled={selectedTrips?.length <= 0 || containsGroup}
              >
                Utwórz ładunek
              </button>
            </Link>
            <button onClick={handleDeleteCard} className="primary-btn delete">
              {t('buttons.deleteCard')}
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
        <div className="card-spec-table">
          <AdditionalInformation />
        </div>
      </section>
    </div>
  );
};
export default CardSpecification;
