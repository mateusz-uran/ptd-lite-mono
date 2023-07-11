import '../../../css/tables.css';
import { useSelector } from 'react-redux';
import {
  getPetrolSelectors,
  useGetPetrolByCardIdQuery,
} from '../../../api/petrol/petrolApiSlice';
import LoadingDots from '../../../components/LoadingDots';
import PetrolTableRow from './PetrolTableRow';
import { useTranslation } from 'react-i18next';

const PetrolTable = ({ cardId }) => {
  const { t } = useTranslation();
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
          <span className="empty-response">{t('misc.petrolTableEmpty')}</span>
        </td>
      </tr>
    );
  }

  if (isError && error.data === undefined) {
    tableContent = (
      <tr>
        <td colSpan={6}>
          <span className="empty-response">{t('misc.errorMessage')}.</span>
        </td>
      </tr>
    );
  }

  return (
    <div className="fuel-table">
      <h3>{t('misc.petrolHead')}</h3>
      <table>
        <thead>
          <tr>
            <th>{t('petrolInputs.date')}</th>
            <th>{t('petrolInputs.location')}</th>
            <th>{t('petrolInputs.counter')}</th>
            <th>{t('petrolInputs.amount')}</th>
            <th>{t('petrolInputs.payment')}</th>
            <th className="manage-cell-wrapper"></th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};
export default PetrolTable;
