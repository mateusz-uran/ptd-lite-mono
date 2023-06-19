import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../auth/auth0Slice';
import '../../css/misc.css';
import { getAdditionalInfo } from '../additional/additionalSlice';

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const GenerateSinglePdf = ({ cardId, page, fullPage }) => {
  const { user } = useAuth0();
  const accessToken = useSelector(getAccessToken);
  const additionalInfo = useSelector(getAdditionalInfo);

  const generatePDF = async () => {
    const username = user.nickname;
    const url = `${API_URL}/pdf/generate`;
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

  if (fullPage) {
    return (
      <button className="pdf-button" onClick={generatePDF}>
        <i className="bx bxs-cloud-download icon"></i>
        <span className="text">Download PDF</span>
      </button>
    );
  }

  return (
    <div className="generate-single-pdf">
      <button onClick={generatePDF}>
        <i className="bx bxs-printer"></i>
      </button>
    </div>
  );
};
export default GenerateSinglePdf;
