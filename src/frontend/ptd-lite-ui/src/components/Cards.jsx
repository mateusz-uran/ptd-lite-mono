import CardForm from '../features/card/CardForm';
import '../css/cards.css';

const Cards = () => {
  return (
    <main>
      <header className="comp-header">
        <i className="bx bx-home-alt icon"></i>
        <i className="bx bx-chevron-right icon-right"></i>
        <span>Cards</span>
      </header>
      <section>
        <CardForm />
      </section>
    </main>
  );
};
export default Cards;
