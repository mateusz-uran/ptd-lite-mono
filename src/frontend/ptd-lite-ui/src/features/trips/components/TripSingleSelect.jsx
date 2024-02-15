import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectedTrip,
  selectedTripArray,
  storeSelectedTrips,
} from "../slices/tripSelectedSlice";

const TripSingleSelect = ({ tripObject }) => {
  const dispatch = useDispatch();
  const selectedTrip = useSelector(selectedTripArray);

  const handleCheckboxChangeRedux = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      dispatch(storeSelectedTrips(tripObject));
    } else {
      dispatch(removeSelectedTrip(tripObject));
    }
  };

  const isChecked = selectedTrip.some((trip) => trip.id === tripObject.id);

  return (
    <input
      type="checkbox"
      value={tripObject.id}
      checked={isChecked}
      onChange={(event) => handleCheckboxChangeRedux(event)}
    />
  );
};
export default TripSingleSelect;
