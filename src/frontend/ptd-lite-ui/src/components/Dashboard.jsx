import { useTranslation } from "react-i18next";
import Header from "./Header";
import StatisticContent from "../features/stats/StatisticContent";
import { Link, useLocation } from "react-router-dom";
import { selectedTripArray } from "../features/trips/slices/tripSelectedSlice";
import { useSelector } from "react-redux";
import { getPermissions } from "../features/auth/auth0Slice";
import "../css/dashboard.css";
import { BiLinkExternal } from "react-icons/bi";
import DashManageBar from "../features/dashboard/DashManageBar";
import SmallTripTable from "../features/trips/components/SmallTripTable";
import { useGetLastTripByCardIdQuery } from "../api/trips/tripsApiSlice";
import PetrolTable from "../features/fuel/components/PetrolTable";
import AdBlueTable from "../features/fuel/components/AdBlueTable";
import DashSkeleton from "../features/dashboard/DashSkeleton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Dashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAuth0();
  var storedCardAndUser = JSON.parse(localStorage.getItem("card_and_user"));

  let fetchData = true;
  if (storedCardAndUser && storedCardAndUser.nick === user.nickname) {
    fetchData = true;
  } else {
    localStorage.removeItem("card_and_user");
    fetchData = false;
  }

  const selectedTrips = useSelector(selectedTripArray);
  const loggedInUserRole = useSelector(getPermissions);

  const containsGroup = selectedTrips.some(
    (item) => item.group && item.group !== null
  );

  const {
    data: lastTrip,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetLastTripByCardIdQuery(storedCardAndUser?.cardId, {
    skip: storedCardAndUser === null || !fetchData,
  });

  let sectionContent;

  if (storedCardAndUser === null) {
    sectionContent = <DashSkeleton />;
  } else {
    sectionContent = (
      <>
        <div className="btn-manage">
          <h5>
            {t("dashboard.chosenCard")}
            :&nbsp;
            {storedCardAndUser.cardNumber
              ? storedCardAndUser.cardNumber
              : "-/-"}
          </h5>
          <Link
            to={`${location.pathname}/${encodeURIComponent(
              storedCardAndUser.cardNumber
            )}/${storedCardAndUser.cardId}`}
            className={`${
              storedCardAndUser.cardNumber === null ? "disabled-link" : ""
            }`}
          >
            <button
              className="small-btn small-manage-btn"
              disabled={storedCardAndUser.cardNumber === null}
            >
              <BiLinkExternal />
            </button>
          </Link>
        </div>
        <DashManageBar
          selectedCardId={storedCardAndUser.cardId}
          selectedCardNumber={storedCardAndUser.cardNumber}
          selectedTrips={selectedTrips}
          containsGroup={containsGroup}
          loggedInUserRole={loggedInUserRole}
        />
        <div className="trip-manage">
          <SmallTripTable
            lastTrip={lastTrip}
            isError={isError}
            error={error}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </div>
        <div className="petrol-manage">
          <PetrolTable
            cardId={storedCardAndUser.cardId}
            component={"dashboard"}
          />
        </div>
        <div className="adblue-manage">
          <AdBlueTable
            cardId={storedCardAndUser.cardId}
            component={"dashboard"}
          />
        </div>
        <StatisticContent fetchData={fetchData} />
      </>
    );
  }

  return (
    <div>
      <Header
        compArray={[
          {
            compName: t("misc.dashboard"),
          },
        ]}
      />
      <section id="dashboard">{sectionContent}</section>
    </div>
  );
};
export default Dashboard;
