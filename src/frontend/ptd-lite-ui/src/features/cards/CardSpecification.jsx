import '../../css/card_spec.css';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import CardForm from './CardForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCardEditing, updateCardStatus } from './updateCardSlice';

const CardSpecification = () => {
  const dispatch = useDispatch();
  const { cardNumber } = useParams();
  const selectedCard = localStorage.getItem('selected_card');

  const handleSingleCard = () => {
    var result = { selectedCard, cardNumber };
    dispatch(updateCardStatus(result));
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
            <button className="edit-button" onClick={handleSingleCard}>
              Edit number
            </button>
            <button className="pdf-button">Download pdf</button>
            <button>Delete</button>
          </div>
          <div className="form-wrapper">
            <CardForm />
          </div>
        </div>
        <div>trip table</div>
        <div>petrol table</div>
        <div>ad blue table</div>
        <div>additional information</div>
      </section>
    </div>
  );
};
export default CardSpecification;
