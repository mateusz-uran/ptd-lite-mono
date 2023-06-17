import { useDispatch, useSelector } from 'react-redux';
import {
  getPetrolSelectors,
  useDeletePetrolMutation,
  useGetPetrolByCardIdQuery,
} from '../features/petrol/petrolSlice';
import FuelForm from '../features/fuel/FuelForm';
import petrolInputs from '../features/fuel/petrolInputs';
import { petrolSchema } from '../features/fuel/yupSchema';
import {
  componentName,
  isFormOpen,
  openFuelForm,
} from '../features/fuel/fuelFormSlice';
import { useState } from 'react';

const PetrolTable = ({ cardId }) => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useGetPetrolByCardIdQuery(cardId);
  const { selectAll: selectAllPetrolFromCard } = getPetrolSelectors(cardId);
  const petrolEntities = useSelector(selectAllPetrolFromCard);
  const fuelFormStatus = useSelector(isFormOpen);
  const component = useSelector(componentName);
  const [deletePetrol] = useDeletePetrolMutation();
  const [interactiveVisible, setInteractiveVisible] = useState(
    new Array(petrolEntities.length).fill(false)
  );

  let tableContent;
  let defaultResponse;

  let shouldRenderMinimumRows = 5;
  let emptyRowCount = 5;

  const toggleFuelForm = () => {
    dispatch(openFuelForm({ component: 'petrol', edit: false }));
  };

  const handleEditPetrol = (petrolId) => {
    dispatch(
      openFuelForm({ component: 'petrol', edit: true, petrolId: petrolId })
    );
  };

  const handleDeletePetrol = async (petrolId) => {
    await deletePetrol(petrolId).unwrap();
  };

  const toggleInteractiveVisible = (index) => {
    setInteractiveVisible((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !prevState[index];
      return updatedState;
    });
  };

  if (isLoading) {
    defaultResponse = <p>Loading data...</p>;
  }

  if (isError) {
    defaultResponse = <p>No data to display</p>;
  }

  if (isSuccess && petrolEntities?.length) {
    shouldRenderMinimumRows = 0;
    shouldRenderMinimumRows = petrolEntities.length < 5;
    emptyRowCount = 0;
    emptyRowCount = shouldRenderMinimumRows ? 5 - petrolEntities.length : 0;

    tableContent = petrolEntities.map((fuel, i) => (
      <tr key={i}>
        <td>{fuel.refuelingDate}</td>
        <td>{fuel.refuelingLocation}</td>
        <td>{fuel.vehicleCounter}</td>
        <td>{fuel.refuelingAmount}</td>
        <td>{fuel.paymentMethod}</td>
        <td className="last-cell">
          <div className={`interactive ${interactiveVisible[i] ? 'show' : ''}`}>
            <button onClick={() => handleEditPetrol(fuel.id)}>
              <i className="bx bxs-edit edit"></i>
            </button>
            <button onClick={() => handleDeletePetrol(fuel.id)}>
              <i className="bx bxs-trash-alt"></i>
            </button>
          </div>
          <button className="dots" onClick={() => toggleInteractiveVisible(i)}>
            <i className="bx bx-dots-horizontal dots-horizontal"></i>
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div style={{ width: '100%' }} className="petrol-table">
      <h5>Petrol</h5>
      {fuelFormStatus && component === 'petrol' && (
        <FuelForm inputs={petrolInputs} schema={petrolSchema} cardId={cardId} />
      )}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Counter</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
          {emptyRowCount === 0 && (
            <tr className="empty-row">
              <td colSpan={6}>
                <div className="empty-row-button">
                  <button onClick={toggleFuelForm}>
                    <span className="text">Add</span>
                    <i className="bx bx-message-square-add icon"></i>
                  </button>
                </div>
              </td>
            </tr>
          )}
          {emptyRowCount > 0 && (
            <tr className="empty-row">
              <td colSpan={6} style={{ height: `${emptyRowCount * 25}px` }}>
                <div className="empty-row-button">
                  {defaultResponse}
                  <button onClick={toggleFuelForm}>
                    <span className="text">Add</span>
                    <i className="bx bx-message-square-add icon"></i>
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PetrolTable;
