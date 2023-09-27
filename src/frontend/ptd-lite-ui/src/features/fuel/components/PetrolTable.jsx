import "../../../css/tables.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPetrolSelectors,
  useGetPetrolByCardIdQuery,
} from "../../../api/petrol/petrolApiSlice";
import { useTranslation } from "react-i18next";
import PetrolTableContent from "./PetrolTableContent";
import {
  hidePetrolContent,
  isPetrolContentToggled,
  showPetrolContent,
} from "../slices/petrolContentToggleSlice";
import ToggleButton from "../../../components/ToggleButton";

const PetrolTable = ({ cardId, component }) => {
  const { t } = useTranslation();
  const petrolTableConent = useSelector(isPetrolContentToggled);
  const { isLoading, isSuccess, isError, error } = useGetPetrolByCardIdQuery(
    cardId,
    { skip: component === "dashboard" && !petrolTableConent }
  );
  const { selectAll: selectAllPetrolFromCard } = getPetrolSelectors(cardId);
  const petrolEntities = useSelector(selectAllPetrolFromCard);
  const dispatch = useDispatch();

  let tableContent;
  if (component === "dashboard" && !petrolTableConent) {
    tableContent = (
      <tr>
        <td colSpan={6}>
          <ToggleButton
            toggleFunction={() => dispatch(showPetrolContent())}
            toggleCondition={petrolTableConent}
          />
        </td>
      </tr>
    );
  } else {
    tableContent = (
      <PetrolTableContent
        isLoading={isLoading}
        isSuccess={isSuccess}
        petrolEntities={petrolEntities}
        isError={isError}
        error={error}
      />
    );
  }

  return (
    <div className="fuel-table">
      <h3>{t("misc.petrolHead")}</h3>
      <table>
        <thead>
          <tr>
            <th>{t("petrolInputs.date")}</th>
            <th>{t("petrolInputs.location")}</th>
            <th>{t("petrolInputs.counter")}</th>
            <th>{t("petrolInputs.amount")}</th>
            <th>{t("petrolInputs.payment")}</th>
            <th className="manage-cell-wrapper"></th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
      <div className="toggle-button-wrapper">
        {component === "dashboard" && petrolTableConent && (
          <ToggleButton
            toggleFunction={() => dispatch(hidePetrolContent())}
            toggleCondition={petrolTableConent}
          />
        )}
      </div>
    </div>
  );
};
export default PetrolTable;
