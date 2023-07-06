import '../../css/tables.css';
import { useSelector } from 'react-redux';
import LoadingDots from '../LoadingDots';
import {
  getAdBlueSelectors,
  useGetBlueByCardIdQuery,
} from '../../api/adblue/adBlueApiSlice';
import AdBlueTableRow from './AdBlueTableRow';
import { useTranslation } from 'react-i18next';

const AdBlueTable = ({ cardId }) => {
  const { t } = useTranslation();
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
          <span className="empty-response">{t('misc.blueTableEmpty')}</span>
        </td>
      </tr>
    );
  }

  if (isError && error.data === undefined) {
    tableContent = (
      <tr>
        <td colSpan={4}>
          <span className="empty-response">{t('misc.errorMessage')}.</span>
        </td>
      </tr>
    );
  }

  return (
    <div className="fuel-table">
      <h3>{t('misc.blueHead')}</h3>
      <table>
        <thead>
          <tr>
            <th>{t('adBlueInputs.date')}</th>
            <th>{t('adBlueInputs.location')}</th>
            <th>{t('adBlueInputs.amount')}</th>
            <th className="manage-cell-wrapper">edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};
export default AdBlueTable;
