import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  closeToastNotification,
  isNotificationShown,
  notificationType,
  openModal,
} from "../../modal/slices/modalSlice";
import { Link, useLocation } from "react-router-dom";
import { updateCardStatus } from "../slices/updateCardSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import {
  clearAdditionalData,
  getStoredCardIdAdditionalInfo,
} from "../../additionalInfo/additionalInfoSlice";

const CardItem = ({ cards }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useAuth0();
  const selectedCardIdInAdditionalInfo = useSelector(
    getStoredCardIdAdditionalInfo
  );

  const toastNotificationIsShown = useSelector(isNotificationShown);
  const toastNotificationType = useSelector(notificationType);

  useEffect(() => {
    if (toastNotificationIsShown) {
      if (toastNotificationType === "success") {
        toast.info(t("toastify.deletedSuccesfully"));
      } else if (toastNotificationType === "error") {
        toast.error(t("toastify.failDelete"));
      } else {
        toast.warn(t("toastify.error"));
      }
      dispatch(closeToastNotification());
    }
  }, []);

  const formattedCards = cards.map((card) => {
    const creationTime = card.creationTime;
    const formattedDate = new Date(creationTime).toISOString().split("T")[0];

    return {
      ...card,
      creationTime: formattedDate,
    };
  });

  const handleSingleCard = (cardId, cardNumber) => {
    var payload = {
      selectedCard: cardId,
      cardNumber: cardNumber,
    };
    dispatch(updateCardStatus(payload));
  };

  const handleDeleteCard = (cardId) => {
    let cardDeletePayload = {
      objectId: cardId,
      message: t("misc.modalMessage"),
      method: "deleteCard",
    };
    dispatch(openModal(cardDeletePayload));
  };

  function storeSelectedCard(cardId, cardNumber) {
    var selectedCardAndUser = {
      cardId: Number(cardId),
      cardNumber: String(cardNumber),
      nick: String(user.nickname),
    };
    localStorage.setItem("card_and_user", JSON.stringify(selectedCardAndUser));
  }

  return formattedCards.map((card, index) => (
    <div key={index} className="card-wrapper">
      <div className="single-card">
        <div className="details-wrapper">
          <span>
            <p>{t("misc.number")}:</p> <p className="content">{card.number}</p>
          </span>
          <span>
            {t("misc.creationTime")}:&nbsp;
            <p className="content">{card.creationTime}</p>
          </span>
        </div>
        <div className="buttons-wrapper">
          <Link
            to={`${location.pathname}/${encodeURIComponent(card.number)}/${
              card.id
            }`}
          >
            <button
              onClick={() => storeSelectedCard(card.id, card.number)}
              className="primary-btn"
            >
              {t("buttons.browse")}
            </button>
          </Link>
          <Link
            to={`${location.pathname}/${encodeURIComponent(card.number)}/${
              card.id
            }/add/trip`}
          >
            <button className="secondary-btn">{t("buttons.addTrip")}</button>
          </Link>
          <Link
            to={`${location.pathname}/${encodeURIComponent(card.number)}/${
              card.id
            }/add/${"petrol"}`}
          >
            <button className="secondary-btn">{t("buttons.addPetrol")}</button>
          </Link>
          <Link
            to={`${location.pathname}/${encodeURIComponent(card.number)}/${
              card.id
            }/add/${"blue"}`}
          >
            <button className="secondary-btn">{t("buttons.addBlue")}</button>
          </Link>
          <button
            onClick={() => handleSingleCard(card.id, card.number)}
            className="secondary-btn edit"
          >
            {t("buttons.editNumber")}
          </button>
          <button
            onClick={() => handleDeleteCard(card.id)}
            className="primary-btn delete"
          >
            {t("buttons.deleteCard")}
          </button>
        </div>
      </div>
    </div>
  ));
};
export default CardItem;
