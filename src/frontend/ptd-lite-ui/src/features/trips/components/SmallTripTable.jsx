import React from "react";
import LoadingDots from "../../../components/LoadingDots";
import TripTableBody from "./TripTableBody";
import { useTranslation } from "react-i18next";

const SmallTripTable = ({ lastTrip, isLoading, isError, error, isSuccess }) => {
  const { t } = useTranslation();

  let tableContent;
  if (isLoading) {
    tableContent = (
      <tr>
        <td colSpan={13}>
          <LoadingDots />
        </td>
      </tr>
    );
  } else if (isSuccess && lastTrip?.length) {
    tableContent = <TripTableBody tripEntities={lastTrip} />;
  } else if (isError && error.data?.statusCode === 404) {
    tableContent = (
      <tr>
        <td colSpan={13}>
          <span className="empty-response">{t("misc.tripTableEmpty")}</span>
        </td>
      </tr>
    );
  } else if (isError && error.data === undefined) {
    tableContent = (
      <tr>
        <td colSpan={13}>
          <span className="empty-response">{t("misc.errorMessage")}.</span>
        </td>
      </tr>
    );
  }

  return (
    <div className="trip-table">
      <h3>{t("misc.tripSmallHead")}</h3>
      <table>
        <thead>
          <tr>
            <th className="icon-wrapper"></th>
            <th colSpan={5}>{t("misc.tripStart")}</th>
            <th colSpan={5}>{t("misc.tripEnd")}</th>
            <th className="manage-cell"></th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th>{t("tripInputs.day")}</th>
            <th>{t("tripInputs.hour")}</th>
            <th>{t("tripInputs.location")}</th>
            <th>{t("tripInputs.country")}</th>
            <th>{t("tripInputs.counter")}</th>
            <th>{t("tripInputs.day")}</th>
            <th>{t("tripInputs.hour")}</th>
            <th>{t("tripInputs.location")}</th>
            <th>{t("tripInputs.country")}</th>
            <th>{t("tripInputs.counter")}</th>
            <th className="manage-cell"></th>
            <th colSpan={2}>
              {t("misc.cargo")} / {t("misc.weight")} / {t("misc.notes")}
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};

export default SmallTripTable;
