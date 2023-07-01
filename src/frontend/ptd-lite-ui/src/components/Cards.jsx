import CardForm from '../features/cards/CardForm';
import Header from './Header';
import '../css/cards.css';
import { useGetLastCardsQuery } from '../api/card/cardApiSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { isCardEditing } from '../features/cards/updateCardSlice';
import LoadingDots from './LoadingDots';
import { useTranslation } from 'react-i18next';
import CardItem from '../features/cards/CardItem';

const Cards = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  let cards;
  const isEditing = useSelector(isCardEditing);
  const {
    data: lastCards,
    isSuccess,
    isError,
    isLoading,
  } = useGetLastCardsQuery(user.nickname);

  if (isLoading) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card">
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (isError) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card error">
          <span>{t('misc.errorMessage')}</span>
        </div>
      </div>
    );
  }

  if (isSuccess && lastCards?.length >= 1) {
    cards = <CardItem cards={lastCards} compName={'cards'} />;
  }

  if (isSuccess && lastCards?.length <= 0) {
    cards = (
      <div className="card-wrapper">
        <div className="single-card error">
          <span>{t('misc.noCards')}.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        compArray={[
          {
            compName: t('misc.cards'),
          },
        ]}
      />
      <section className="cards-section">
        <span className="h-section">
          <p className={`${!isEditing ? 'edit' : ''}`}>
            {t('buttons.smallAdd')}
          </p>
          <span>&nbsp;/&nbsp;</span>
          <p className={`${isEditing ? 'edit' : ''}`}>
            {t('buttons.smallEdit')}
          </p>
          <span>{t('misc.card')}</span>
        </span>
        <CardForm />
        {cards}
      </section>
    </div>
  );
};
export default Cards;
