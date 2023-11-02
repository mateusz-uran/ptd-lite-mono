import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  clearSelectedTrips,
  selectedTripArray,
} from "../slices/tripSelectedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { translateCargoInputs } from "../inputs/cargoInputs";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { useCreateTripsGroupMutation } from "../../../api/trips/tripsApiSlice";
import SelectedTripsTable from "../components/SelectedTripsTable";

const TripCargoForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cardNumber } = useParams();
  const selectedTrips = useSelector(selectedTripArray);
  const inputs = translateCargoInputs();

  const [createTripsGroup] = useCreateTripsGroupMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const selectedTripIds = selectedTrips.map((trip) => trip.id);
      const weight = parseFloat(data.weight);

      let tripGroupPayload = {
        ...data,
        weight,
        tripIds: selectedTripIds,
      };
      await createTripsGroup(tripGroupPayload).unwrap();
      dispatch(clearSelectedTrips());
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
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
      <SelectedTripsTable trips={selectedTrips} />
      <div className="cargo-input-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((input, index) => (
            <div key={index}>
              <label htmlFor={input.name} className="primary-label">
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                {...register(input.name)}
                step={input?.step}
                className="primary-input"
              />
            </div>
          ))}
          <button className="primary-btn">{t("buttons.addCargo")}</button>
        </form>
      </div>
    </Fragment>
  );
};
export default TripCargoForm;
