import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { getAdditionalInfo } from '../features/additionalInfo/additionalInfoSlice';
import { getAccessToken } from '../features/auth/auth0Slice';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ProgressModal from '../features/pdf/ProgressModal';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_BACKEND_API_URL;
const FRONTEND_URL = import.meta.env.VITE_FRONT_URL;

const GeneratePDF = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { cardId } = useParams();
  const accessToken = useSelector(getAccessToken);
  const additionalInfo = useSelector(getAdditionalInfo);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const generatePDF = async (page) => {
    setShowProgressModal(true);
    const username = user.nickname;
    const url = `${API_URL}/pdf/generate-doc`;
    try {
      const response = await axios.post(url, additionalInfo, {
        headers: {
          'Access-Control-Allow-Origin': FRONTEND_URL,
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          username,
          cardId,
          page,
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const objectURL = URL.createObjectURL(blob);

      window.open(objectURL, '_blank');

      URL.revokeObjectURL(objectURL);
      setShowProgressModal(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setShowProgressModal(false);
    }
  };

  return (
    <div className="pdf-button-wrapper">
      <button className="primary-btn pdf-button" onClick={() => generatePDF()}>
        {t('buttons.downloadPdf')}
      </button>
      <ul>
        <li>
          <button
            className="small-btn list-btn"
            onClick={() => generatePDF('first')}
          >
            {t('buttons.downloadPdfFirst')}
          </button>
        </li>
        <li>
          <button
            className="small-btn list-btn"
            onClick={() => generatePDF('second')}
          >
            {t('buttons.downloadPdfSecond')}
          </button>
        </li>
      </ul>
      {showProgressModal && <ProgressModal />}
    </div>
  );
};
export default GeneratePDF;
