import React from "react";
import GeneratePDF from "../../pdf/components/GeneratePDF";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedTripArray } from "../../trips/slices/tripSelectedSlice";
import { useTranslation } from "react-i18next";
import { getPermissions } from "../../auth/auth0Slice";

const CardManageBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const selectedTrips = useSelector(selectedTripArray);
  const loggedInUserRole = useSelector(getPermissions);

  const containsGroup = selectedTrips.some(
    (item) => item.group && item.group !== null
  );

  const handleDeleteCard = () => {
    try {
      let cardDeletePayload = {
        objectId: Number(cardId),
        message: t("misc.modalMessage"),
        method: "deleteCard",
      };
      dispatch(openModal(cardDeletePayload));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card-manage">
      <h5>{t("misc.manage")}</h5>
      <div className="buttons-wrapper">
        <GeneratePDF />
        <Link to={`${location.pathname}/add/trip`}>
          <button className="secondary-btn">{t("buttons.addTrip")}</button>
        </Link>
        <Link to={`${location.pathname}/add/${"petrol"}`}>
          <button className="secondary-btn">{t("buttons.addPetrol")}</button>
        </Link>
        <Link to={`${location.pathname}/add/${"blue"}`}>
          <button className="secondary-btn">{t("buttons.addBlue")}</button>
        </Link>
        <Link
          to={"createcargo"}
          className={`cargo-link ${
            selectedTrips?.length <= 0 || containsGroup ? "inactive" : undefined
          }`}
        >
          <button
            className="secondary-btn"
            disabled={selectedTrips?.length <= 0 || containsGroup}
          >
            {t("buttons.addCargo")}
          </button>
        </Link>
        {loggedInUserRole.includes("super_driver") && (
          <Link
            to={"invoice"}
            className={`cargo-link ${
              selectedTrips?.length <= 0 ? "inactive" : undefined
            }`}
          >
            <button
              className="secondary-btn"
              disabled={selectedTrips?.length <= 0}
            >
              {t("buttons.countInvoice")}
            </button>
          </Link>
        )}
        <button onClick={handleDeleteCard} className="primary-btn delete">
          {t("buttons.deleteCard")}
        </button>
      </div>
    </div>
  );
};

export default CardManageBar;
