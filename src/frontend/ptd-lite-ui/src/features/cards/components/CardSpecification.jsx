import "../../../css/card_spec.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import TripTable from "../../trips/components/TripTable";
import { useTranslation } from "react-i18next";
import PetrolTable from "../../fuel/components/PetrolTable";
import AdBlueTable from "../../fuel/components/AdBlueTable";
import AdditionalInformation from "../../additionalInfo/AdditionalInformation";
import { useState } from "react";
import CardManageBar from "./CardManageBar";

const CardSpecification = () => {
  const { t } = useTranslation();
  const { cardNumber, cardId } = useParams();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  return (
    <div className="card-spec">
      <Header
        compArray={[
          {
            compName: t("misc.cards"),
          },
          {
            compName: cardNumber,
          },
        ]}
      />
      <section>
        <CardManageBar />
        <div className="card-spec-table">
          <TripTable cardId={cardId} />
        </div>
        <div className="card-spec-table">
          <PetrolTable cardId={cardId} />
        </div>
        <div className="card-spec-table">
          <AdBlueTable cardId={cardId} />
        </div>
        <div className="card-spec-table additonal">
          <h5 className="main-h">{t("misc.additonalHead")}</h5>
          <div
            className={`arrow-wrapper ${
              showAdditionalInfo ? "visible" : undefined
            }`}
          >
            <button
              className="arrow-button"
              onClick={() => setShowAdditionalInfo((prevState) => !prevState)}
            >
              {showAdditionalInfo ? t("buttons.shrink") : t("buttons.expand")}
              <MdKeyboardArrowDown className="arrow" />
            </button>
          </div>
          {showAdditionalInfo && <AdditionalInformation />}
        </div>
      </section>
    </div>
  );
};
export default CardSpecification;
