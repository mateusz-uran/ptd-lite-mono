import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAdditionalInfo } from "../../additionalInfo/additionalInfoSlice";
import { Link, useParams } from "react-router-dom";
import ProgressModal from "./ProgressModal";
import { useTranslation } from "react-i18next";
import { generatePdf, selectIsLoading } from "../../../api/pdf/pdfApiSlice";

const GeneratePDF = ({ storedCardId }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { cardId: urlCardId } = useParams();
  const dispatch = useDispatch();
  const additionalInfo = useSelector(getAdditionalInfo);

  const isLoading = useSelector(selectIsLoading);

  const generatePDFAndShow = async (page) => {
    let username = user.nickname;
    const cardId = storedCardId !== undefined ? storedCardId : urlCardId;
    dispatch(generatePdf({ username, cardId, page, additionalInfo }));
  };

  return (
    <div className="pdf-button-wrapper">
      <button
        className="primary-btn pdf-button"
        onClick={() => generatePDFAndShow()}
      >
        {t("buttons.downloadPdf")}
      </button>
      <ul>
        <li>
          <button
            className="small-btn list-btn"
            onClick={() => generatePDFAndShow("first")}
          >
            {t("buttons.downloadPdfFirst")}
          </button>
        </li>
        <li>
          <button
            className="small-btn list-btn"
            onClick={() => generatePDFAndShow("second")}
          >
            {t("buttons.downloadPdfSecond")}
          </button>
        </li>
      </ul>
      {isLoading && <ProgressModal />}
    </div>
  );
};
export default GeneratePDF;
