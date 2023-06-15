import { useDispatch, useSelector } from 'react-redux';
import {
  getAdBlueSelectors,
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

const AdBlueTable = ({ cardId }) => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useGetBlueByCardIdQuery(cardId);

  const { selectAll: selectAllBlueFromCard } = getAdBlueSelectors(cardId);

  const blueEntities = useSelector(selectAllBlueFromCard);
  const fuelFormStatus = useSelector(isFormOpen);
  const component = useSelector(componentName);

  let tableContent;
  let defaultResponse;

  let shouldRenderMinimumRows = 5;
  let emptyRowCount = 5;

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
      </tr>
    ));
  }

  const toggleFuelForm = () => {
    dispatch(openFuelForm('blue'));
  };

  return (
    <div style={{ width: '100%' }}>
      {fuelFormStatus && component === 'blue' && (
        <FuelForm inputs={blueInputs} schema={adBlueSchema} cardId={cardId} />
      )}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}

          {emptyRowCount > 0 && (
            <tr className="empty-row">
              <td colSpan={4} style={{ height: `${emptyRowCount * 25}px` }}>
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
