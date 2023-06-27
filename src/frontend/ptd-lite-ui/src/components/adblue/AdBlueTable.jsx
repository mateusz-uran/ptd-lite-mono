import '../../css/tables.css';
import { useSelector } from 'react-redux';
import LoadingDots from '../LoadingDots';
import {
  getAdBlueSelectors,
  useGetBlueByCardIdQuery,
} from '../../api/adblue/adBlueApiSlice';
import AdBlueTableRow from './AdBlueTableRow';

const AdBlueTable = ({ cardId }) => {
  const { isLoading, isSuccess, isError, error } =
    useGetBlueByCardIdQuery(cardId);
  const { selectAll: selectAllBlueFromCard } = getAdBlueSelectors(cardId);
  const blueEntities = useSelector(selectAllBlueFromCard);
  let tableContent;

  if (isLoading) {
    tableContent = (
      <tr>
        <td colSpan={4}>
          <LoadingDots />
        </td>
      </tr>
    );
  }

  if (isSuccess && blueEntities?.length) {
    tableContent = <AdBlueTableRow blueEntities={blueEntities} />;
  }

  if (isError && error.data?.statusCode === 404) {
    tableContent = (
      <tr>
        <td colSpan={4}>
          <span className="empty-response">{error.data?.description}</span>
        </td>
      </tr>
    );
  }

  if (isError && error.data === undefined) {
    tableContent = (
      <tr>
        <td colSpan={4}>
          <span className="empty-response">
            Server is not available at the moment, try again later.
          </span>
        </td>
      </tr>
    );
  }

  return (
    <div className="fuel-table">
      <h3>AdBlue</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Amount</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};
export default AdBlueTable;
