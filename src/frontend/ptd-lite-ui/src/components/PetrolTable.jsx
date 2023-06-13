import { useSelector } from 'react-redux';
import {
  getPetrolSelectors,
  useGetPetrolByCardIdQuery,
} from '../features/petrol/petrolSlice';

const PetrolTable = ({ cardId }) => {
  const { isLoading, isSuccess, isError } = useGetPetrolByCardIdQuery(cardId);

  const { selectAll: selectAllPetrolFromCard } = getPetrolSelectors(cardId);

  const petrolEntities = useSelector(selectAllPetrolFromCard);

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
      </tr>
    ));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Location</th>
          <th>Counter</th>
          <th>Amount</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        {tableContent}

        {emptyRowCount > 0 && (
          <tr className="empty-row">
            <td colSpan={5} style={{ height: `${emptyRowCount * 25}px` }}>
              <div className="empty-row-button">
                {defaultResponse}
                <button>
                  <span className="text">Add</span>
                  <i className="bx bx-message-square-add icon"></i>
                </button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PetrolTable;
