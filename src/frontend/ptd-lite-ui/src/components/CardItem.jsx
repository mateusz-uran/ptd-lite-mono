import { useParams } from 'react-router-dom';

const CardItem = () => {
  const { cardNumber } = useParams();
  return (
    <main>
      <header className="comp-header">
        <i class="bx bx-home-alt icon"></i>
        <i class="bx bx-chevron-right icon-right"></i>
        <span>Card</span>
        <i class="bx bx-chevron-right icon-right"></i>
        <span>{cardNumber}</span>
      </header>
      <section>card details - trips, fuels, adblue etc</section>
    </main>
  );
};
export default CardItem;
