import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { getAdditionalInfo } from '../features/additionalInfo/additionalInfoSlice';
import { getAccessToken } from '../features/auth/auth0Slice';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const GeneratePDF = () => {
  const { user } = useAuth0();
  const { cardId } = useParams();
  const accessToken = useSelector(getAccessToken);
  const additionalInfo = useSelector(getAdditionalInfo);

  const generatePDF = async (page) => {
    const username = user.nickname;
    const url = `${API_URL}/pdf/generate-doc`;
    try {
      const response = await axios.post(url, additionalInfo, {
        headers: {
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

      // Open a new window/tab with the PDF
      window.open(objectURL, '_blank');

      // Clean up the object URL
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="pdf-button-wrapper">
      <button className="primary-btn pdf-button" onClick={() => generatePDF()}>
        Download pdf
      </button>
      <ul>
        <li>
          <button
            className="small-btn list-btn"
            onClick={() => generatePDF('first')}
          >
            First page
          </button>
        </li>
        <li>
          <button
            className="small-btn list-btn"
            onClick={() => generatePDF('second')}
          >
            Second page
          </button>
        </li>
      </ul>
    </div>
  );
};
export default GeneratePDF;
