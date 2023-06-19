import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../auth/auth0Slice';

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const GenerateSinglePdf = ({ cardId, page }) => {
  const { user } = useAuth0();
  const accessToken = useSelector(getAccessToken);

  const generatePDF = async () => {
    const username = user.nickname;
    const url = `${API_URL}/pdf/generate`;
    try {
      const response = await axios.get(url, {
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
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};
export default GenerateSinglePdf;
