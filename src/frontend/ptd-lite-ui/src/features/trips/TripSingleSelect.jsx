import { useDispatch, useSelector } from 'react-redux';
import {
  removeSelectedTrip,
  selectedTripArray,
  storeSelectedTrips,
} from './tripSelectedSlice';

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

  const isChecked = selectedTrip.includes(tripObject);

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
