import { useDispatch, useSelector } from 'react-redux';
import {
  getAdBlueSelectors,
  useDeleteAdBlueMutation,
  useGetBlueByCardIdQuery,
} from '../features/adBlue/blueSlice';
import {
  componentName,
  isFormOpen,
  openFuelForm,
} from '../features/fuel/fuelFormSlice';
import FuelForm from '../features/fuel/FuelForm';
import blueInputs from '../features/fuel/blueInputs';
import { adBlueSchema } from '../features/fuel/yupSchema';
import { useState } from 'react';

const AdBlueTable = ({ cardId }) => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useGetBlueByCardIdQuery(cardId);
  const { selectAll: selectAllBlueFromCard } = getAdBlueSelectors(cardId);
  const blueEntities = useSelector(selectAllBlueFromCard);
  const fuelFormStatus = useSelector(isFormOpen);
  const component = useSelector(componentName);
  const [deleteAdBlue] = useDeleteAdBlueMutation();
  const [interactiveVisible, setInteractiveVisible] = useState(
    new Array(blueEntities.length).fill(false)
  );

  let tableContent;
  let defaultResponse;

  let shouldRenderMinimumRows = 5;
  let emptyRowCount = 5;

  const toggleFuelForm = () => {
    dispatch(openFuelForm({ component: 'blue', edit: false }));
  };

  const handleEditBlue = (blueId) => {
    dispatch(openFuelForm({ component: 'blue', edit: true, blueId: blueId }));
  };

  const handleDeleteAdBlue = async (blueId) => {
    await deleteAdBlue(blueId).unwrap();
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

  if (isSuccess && blueEntities?.length) {
    shouldRenderMinimumRows = 0;
    shouldRenderMinimumRows = blueEntities.length < 5;
    emptyRowCount = 0;
    emptyRowCount = shouldRenderMinimumRows ? 5 - blueEntities.length : 0;

    tableContent = blueEntities.map((blue, i) => (
      <tr key={i}>
        <td>{blue.adBlueDate}</td>
        <td>{blue.adBlueLocalization}</td>
        <td>{blue.adBlueAmount}</td>
        <td className="last-cell">
          <div className={`interactive ${interactiveVisible[i] ? 'show' : ''}`}>
            <button onClick={() => handleEditBlue(blue.id)}>
              <i className="bx bxs-edit edit"></i>
            </button>
            <button onClick={() => handleDeleteAdBlue(blue.id)}>
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
    <div style={{ width: '100%' }} className="adblue-table">
      <h5>AdBlue</h5>
      {fuelFormStatus && component === 'blue' && (
        <FuelForm inputs={blueInputs} schema={adBlueSchema} cardId={cardId} />
      )}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Amount</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
          {emptyRowCount === 0 && (
            <tr className="empty-row">
              <td colSpan={5}>
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
              <td colSpan={5} style={{ height: `${emptyRowCount * 25}px` }}>
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
export default AdBlueTable;
