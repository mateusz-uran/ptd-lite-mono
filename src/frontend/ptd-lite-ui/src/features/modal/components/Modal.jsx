import "../../../css/modal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  method,
  modalMessage,
  objectId,
} from "../slices/modalSlice";
import { useDeletecardMutation } from "../../../api/card/cardApiSlice";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteTripGroupMutation } from "../../../api/trips/tripsApiSlice";
import { useDeletePetrolMutation } from "../../../api/petrol/petrolApiSlice";
import { useDeleteAdBlueMutation } from "../../../api/adblue/adBlueApiSlice";

const Modal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const objectIdToDelete = useSelector(objectId);
  const message = useSelector(modalMessage);
  const methodToCall = useSelector(method);
  const [deleteCard] = useDeletecardMutation();
  const [deleteTripGroup] = useDeleteTripGroupMutation();
  const [deletePetrol] = useDeletePetrolMutation();
  const [deleteAdBlue] = useDeleteAdBlueMutation();

  const handleConfirmModal = async () => {
    try {
      switch (methodToCall) {
        case "deleteCard":
          await deleteCard(objectIdToDelete).unwrap();
          var storedCardAndUser = JSON.parse(
            localStorage.getItem("card_and_user")
          );
          if (
            storedCardAndUser &&
            storedCardAndUser.cardId &&
            storedCardAndUser.cardId === objectIdToDelete
          ) {
            localStorage.removeItem("card_and_user");
          }
          if (location.pathname.includes(String(objectIdToDelete))) {
            navigate(-1);
          }
          break;
        case "deleteTripGroup":
          await deleteTripGroup(objectIdToDelete).unwrap();
          break;
        case "deletePetrol":
          await deletePetrol(objectIdToDelete).unwrap();
          break;
        case "deleteAdBlue":
          await deleteAdBlue(objectIdToDelete).unwrap();
          break;
      }
      dispatch(closeModal("success"));
    } catch (err) {
      console.log("Cant delete via modal: ", err);
      dispatch(closeModal("error"));
    }
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>{message}</h4>
        <div className="btn-container">
          <button
            type="button"
            className="primary-btn confirm-btn"
            onClick={handleConfirmModal}
          >
            {t("buttons.confirm")}
          </button>
          <button
            type="button"
            className="primary-btn clear-btn"
            onClick={() => {
              dispatch(closeModal("canceled"));
            }}
          >
            {t("buttons.cancel")}
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
