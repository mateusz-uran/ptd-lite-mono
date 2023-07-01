import '../../css/card_spec.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { openModal } from '../modal/modalSlice';
import TripTable from '../../components/trip-table/TripTable';
import PetrolTable from '../../components/petrol-table/PetrolTable';
import AdBlueTable from '../../components/adblue-table/AdBlueTable';
import AdditionalInformation from '../additionalInfo/AdditionalInformation';
import GeneratePDF from '../../components/GeneratePDF';
import { useTranslation } from 'react-i18next';

const CardSpecification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { cardNumber, cardId } = useParams();
  const navigate = useNavigate();

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
            <Link to={`/home/cards/${cardNumber}/${cardId}/add/trip`}>
              <button className="secondary-btn">{t('buttons.addTrip')}</button>
            </Link>
            <Link to={`/home/cards/${cardNumber}/${cardId}/add/${'petrol'}`}>
              <button className="secondary-btn">
                {t('buttons.addPetrol')}
              </button>
            </Link>
            <Link to={`/home/cards/${cardNumber}/${cardId}/add/${'blue'}`}>
              <button className="secondary-btn">{t('buttons.addBlue')}</button>
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
