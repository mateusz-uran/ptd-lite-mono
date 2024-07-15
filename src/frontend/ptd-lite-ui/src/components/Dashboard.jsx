import { useTranslation } from "react-i18next";
import Header from "./Header";
import StatisticContent from "../features/stats/StatisticContent";
import { Link, useLocation } from "react-router-dom";
import { selectedTripArray } from "../features/trips/slices/tripSelectedSlice";
import { useSelector } from "react-redux";
import "../css/dashboard.css";
import { BiLinkExternal } from "react-icons/bi";
import DashManageBar from "../features/dashboard/DashManageBar";
import SmallTripTable from "../features/trips/components/SmallTripTable";
import { useGetLastTripByCardIdQuery } from "../api/trips/tripsApiSlice";
import PetrolTable from "../features/fuel/components/PetrolTable";
import AdBlueTable from "../features/fuel/components/AdBlueTable";
import DashSkeleton from "../features/dashboard/DashSkeleton";
import useStoredNick from "../hooks/useStoredNick";
import useStoredCardDetails from "../hooks/useStoredCardDetails ";

const Dashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [nick] = useStoredNick();
  const [cardDetails, storeCardDetails] = useStoredCardDetails();

  const selectedTrips = useSelector(selectedTripArray);

  const containsGroup = selectedTrips.some(
    (item) => item.group && item.group !== null
  );

  const {
    data: lastTrip,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetLastTripByCardIdQuery(cardDetails.cardId, {
    skip: nick === "empty",
  });

  let sectionContent;

  if (nick === null || nick === "empty") {
    sectionContent = <DashSkeleton />;
  } else {
    sectionContent = (
      <>
        <div className="btn-manage">
          <h5>
            {t("dashboard.chosenCard")}
            :&nbsp;
            {cardDetails.cardNumber ? cardDetails.cardNumber : "-/-"}
          </h5>
          <Link
            to={`${location.pathname}/${encodeURIComponent(
              cardDetails.cardNumber
            )}/${cardDetails.cardId}`}
            className={`${
              cardDetails.cardNumber === null ? "disabled-link" : ""
            }`}
          >
            <button
              className="small-btn small-manage-btn"
              disabled={cardDetails.cardNumber === null}
            >
              <BiLinkExternal />
            </button>
          </Link>
        </div>
        <DashManageBar
          selectedCardId={cardDetails.cardId}
          selectedCardNumber={cardDetails.cardNumber}
          selectedTrips={selectedTrips}
          containsGroup={containsGroup}
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
          <PetrolTable cardId={cardDetails.cardId} component={"dashboard"} />
        </div>
        <div className="adblue-manage">
          <AdBlueTable cardId={cardDetails.cardId} component={"dashboard"} />
        </div>
        <StatisticContent />
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
