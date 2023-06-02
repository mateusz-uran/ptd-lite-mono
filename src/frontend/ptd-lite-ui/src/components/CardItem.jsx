import { useParams } from 'react-router-dom';

const CardItem = () => {
  const { cardNumber } = useParams();
  return (
    <main>
      <header>Card/{cardNumber}</header>
      <section>card details - trips, fuels, adblue etc</section>
    </main>
  );
};
export default CardItem;
