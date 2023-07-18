import '../../../css/card_spec.css';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';
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
import { useState } from 'react';

const CardSpecification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { cardNumber, cardId } = useParams();
  const selectedTrips = useSelector(selectedTripArray);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const containsGroup = selectedTrips.some(
    (item) => item.group && item.group !== null
  );

  const handleDeleteCard = () => {
    try {
      let cardDeletePayload = {
        objectId: Number(cardId),
        message: t('misc.modalMessage'),
        method: 'deleteCard',
      };
      dispatch(openModal(cardDeletePayload));
    } catch (err) {
      console.log(err);
    }
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
                {t('buttons.addCargo')}
              </button>
            </Link>
            <Link
              to={'calculaterates'}
              className={`cargo-link ${
                selectedTrips?.length <= 0 ? 'inactive' : undefined
              }`}
            >
              <button
                className="secondary-btn"
                disabled={selectedTrips?.length <= 0}
              >
                Calculate rates
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
        <div className="card-spec-table additonal">
          <h5 className="main-h">{t('misc.additonalHead')}</h5>
          <div
            className={`arrow-wrapper ${
              showAdditionalInfo ? 'visible' : undefined
            }`}
          >
            <button
              className="arrow-button"
              onClick={() => setShowAdditionalInfo((prevState) => !prevState)}
            >
              {showAdditionalInfo ? t('buttons.shrink') : t('buttons.expand')}
              <MdKeyboardArrowDown className="arrow" />
            </button>
          </div>
          {showAdditionalInfo && <AdditionalInformation />}
        </div>
      </section>
    </div>
  );
};
export default CardSpecification;
