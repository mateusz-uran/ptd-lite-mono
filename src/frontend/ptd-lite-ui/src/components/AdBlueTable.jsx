import { useSelector } from 'react-redux';
import {
  getAdBlueSelectors,
  useGetBlueByCardIdQuery,
} from '../features/adBlue/blueSlice';
import { Link } from 'react-router-dom';

const AdBlueTable = ({ cardId }) => {
  const component = 'blue';
  const { isLoading, isSuccess, isError } = useGetBlueByCardIdQuery(cardId);

  const { selectAll: selectAllBlueFromCard } = getAdBlueSelectors(cardId);

  const blueEntities = useSelector(selectAllBlueFromCard);

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

  return (
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
                <Link to={`add/${component}/${cardId}`}>
                  <button>
                    <span className="text">Add</span>
                    <i className="bx bx-message-square-add icon"></i>
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default AdBlueTable;
