import React from "react";
import { useTranslation } from "react-i18next";
import GeneratePDF from "../pdf/components/GeneratePDF";
import { Link } from "react-router-dom";

const DashManageBar = ({
  selectedCardId,
  selectedCardNumber,
  selectedTrips,
  containsGroup,
  loggedInUserRole,
}) => {
  const { t } = useTranslation();
  return (
    <div className="card-manage dash-manage">
      <h5>{t("misc.manage")}</h5>
      <div className="buttons-wrapper">
        <GeneratePDF storedCardId={selectedCardId} />
        <Link
          to={`${location.pathname}/${encodeURIComponent(
            selectedCardNumber
          )}/${selectedCardId}/add/trip`}
        >
          <button className="secondary-btn">{t("buttons.addTrip")}</button>
        </Link>
        <Link
          to={`${location.pathname}/${encodeURIComponent(
            selectedCardNumber
          )}/${selectedCardId}/add/${"petrol"}`}
        >
          <button className="secondary-btn">{t("buttons.addPetrol")}</button>
        </Link>
        <Link
          to={`${location.pathname}/${encodeURIComponent(
            selectedCardNumber
          )}/${selectedCardId}/add/${"blue"}`}
        >
          <button className="secondary-btn">{t("buttons.addBlue")}</button>
        </Link>
        <Link
          to={`${location.pathname}/${encodeURIComponent(
            selectedCardNumber
          )}/${selectedCardId}/createcargo`}
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
            to={`${location.pathname}/${encodeURIComponent(
              selectedCardNumber
            )}/${selectedCardId}/invoice`}
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
        <Link to={`${location.pathname}/crm`}>
          <button className="secondary-btn">CRM</button>
        </Link>
      </div>
    </div>
  );
};

export default DashManageBar;
