import '../../css/tables.css';
import { useSelector } from 'react-redux';
import {
  getPetrolSelectors,
  useGetPetrolByCardIdQuery,
} from '../../api/petrol/petrolApiSlice';
import LoadingDots from '../LoadingDots';
import PetrolTableRow from './PetrolTableRow';

const PetrolTable = ({ cardId }) => {
  const { isLoading, isSuccess, isError, error } =
    useGetPetrolByCardIdQuery(cardId);
  const { selectAll: selectAllPetrolFromCard } = getPetrolSelectors(cardId);
  const petrolEntities = useSelector(selectAllPetrolFromCard);
  let tableContent;

  if (isLoading) {
    tableContent = (
      <tr>
        <td colSpan={6}>
          <LoadingDots />
        </td>
      </tr>
    );
  }

  if (isSuccess && petrolEntities?.length) {
    tableContent = <PetrolTableRow petrolEntities={petrolEntities} />;
  }

  if (isError && error.data?.statusCode === 404) {
    tableContent = (
      <tr>
        <td colSpan={6}>
          <span className="empty-response">{error.data?.description}</span>
        </td>
      </tr>
    );
  }

  if (isError && error.data === undefined) {
    tableContent = (
      <tr>
        <td colSpan={6}>
          <span className="empty-response">
            Server is not available at the moment, try again later.
          </span>
        </td>
      </tr>
    );
  }

  return (
    <div className="fuel-table">
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
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};
export default PetrolTable;
