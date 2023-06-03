import { useParams } from 'react-router-dom';
import { useGetSelectedCardQuery } from '../api/apiSlice';

const CardItem = () => {
  const { cardNumber } = useParams();
  const selectedCard = localStorage.getItem('selected_card');
  const {
    data: selectedCardResponse,
    isLoading,
    isSuccess,
  } = useGetSelectedCardQuery(selectedCard);

  let section;
  if (isLoading) {
    section = <section>Loading card details...</section>;
  }

  if (isSuccess) {
    section = <section>card details - trips, fuels, adblue etc</section>;
  }

  return (
    <main>
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
