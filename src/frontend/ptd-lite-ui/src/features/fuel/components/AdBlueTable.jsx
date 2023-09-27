import "../../../css/tables.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdBlueSelectors,
  useGetBlueByCardIdQuery,
} from "../../../api/adblue/adBlueApiSlice";
import { useTranslation } from "react-i18next";
import ToggleButton from "../../../components/ToggleButton";
import AdBlueTableContent from "./AdBlueTableContent";
import {
  hideAdBlueContent,
  isAdBlueContentToggled,
  showAdBlueContent,
} from "../slices/adBlueContentToggleSlice";

const AdBlueTable = ({ cardId, component }) => {
  const { t } = useTranslation();
  const adBlueTableContent = useSelector(isAdBlueContentToggled);
  const { isLoading, isSuccess, isError, error } = useGetBlueByCardIdQuery(
    cardId,
    { skip: component === "dashboard" && !adBlueTableContent }
  );
  const { selectAll: selectAllBlueFromCard } = getAdBlueSelectors(cardId);
  const blueEntities = useSelector(selectAllBlueFromCard);
  const dispatch = useDispatch();

  let tableContent;

  if (component === "dashboard" && !adBlueTableContent) {
    tableContent = (
      <tr>
        <td colSpan={6}>
          <ToggleButton
            toggleFunction={() => dispatch(showAdBlueContent())}
            toggleCondition={adBlueTableContent}
          />
        </td>
      </tr>
    );
  } else {
    tableContent = (
      <AdBlueTableContent
        isLoading={isLoading}
        isSuccess={isSuccess}
        blueEntities={blueEntities}
        isError={isError}
        error={error}
      />
    );
  }

  return (
    <div className="fuel-table">
      <h3>{t("misc.blueHead")}</h3>
      <table>
        <thead>
          <tr>
            <th>{t("adBlueInputs.date")}</th>
            <th>{t("adBlueInputs.location")}</th>
            <th>{t("adBlueInputs.amount")}</th>
            <th className="manage-cell-wrapper"></th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
      <div className="toggle-button-wrapper">
        {component === "dashboard" && adBlueTableContent && (
          <ToggleButton
            toggleFunction={() => dispatch(hideAdBlueContent())}
            toggleCondition={adBlueTableContent}
          />
        )}
      </div>
    </div>
  );
};
export default AdBlueTable;
