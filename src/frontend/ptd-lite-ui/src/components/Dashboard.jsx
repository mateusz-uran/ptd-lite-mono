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

const Dashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  var selectedCardId = localStorage.getItem("selected_card_id");
  var selectedCardNumber = localStorage.getItem("selected_card_number");
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
  } = useGetLastTripByCardIdQuery(selectedCardId);

  let sectionContent;

  if (selectedCardNumber === null) {
    sectionContent = <DashSkeleton />;
  } else {
    sectionContent = (
      <>
        <div className="btn-manage">
          <h5>
            {t("dashboard.chosenCard")}
            :&nbsp;
            {selectedCardNumber ? selectedCardNumber : "brak"}
          </h5>
          <Link
            to={`${location.pathname}/${encodeURIComponent(
              selectedCardNumber
            )}/${selectedCardId}`}
            className={`${selectedCardNumber === null ? "disabled-link" : ""}`}
          >
            <button
              className="small-btn small-manage-btn"
              disabled={selectedCardNumber === null}
            >
              <BiLinkExternal />
            </button>
          </Link>
        </div>
        <DashManageBar
          selectedCardId={selectedCardId}
          selectedCardNumber={selectedCardNumber}
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
          <PetrolTable cardId={selectedCardId} component={"dashboard"} />
        </div>
        <div className="adblue-manage">
          <AdBlueTable cardId={selectedCardId} component={"dashboard"} />
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
