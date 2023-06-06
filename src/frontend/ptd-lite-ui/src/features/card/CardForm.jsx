import { useState } from 'react';
import { useAddNewCardMutation } from './cardSlice';
import { useAuth0 } from '@auth0/auth0-react';

const CardForm = () => {
  const { user } = useAuth0();
  const [addNewCard, { isLoading }] = useAddNewCardMutation();
  const [number, setNumber] = useState('');

  const onNumberChange = (e) => setNumber(e.target.value);

  const onSaveCardClicked = async () => {
    let card = {
      number: number,
      username: user.nickname,
    };
    await addNewCard(card).unwrap();
    setNumber('');
  };

  return (
    <section>
      <form>
        <label htmlFor="cardNumber">Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={number}
          onChange={onNumberChange}
        />
        <button type="button" onClick={onSaveCardClicked}>
          Add
        </button>
      </form>
    </section>
  );
};
export default CardForm;
