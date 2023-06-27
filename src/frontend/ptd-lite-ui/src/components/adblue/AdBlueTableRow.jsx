import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { Fragment } from 'react';
import FuelEditForm from '../../features/fuel/FuelEditForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  editType,
  isModalOpen,
  startEditingFuel,
} from '../../features/fuel/fuelEditSlice';

const AdBlueTableRow = ({ blueEntities }) => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(isModalOpen);
  const modalType = useSelector(editType);
  const handleEditBlue = (blue) => {
    dispatch(startEditingFuel({ name: 'blue', object: blue }));
  };

  const handleDeleteAdBlue = async (blueId) => {};

  return (
    <Fragment>
      {blueEntities.map((blue, i) => (
        <tr key={i}>
          <td>{blue.adBlueDate}</td>
          <td>{blue.adBlueLocalization}</td>
          <td>{blue.adBlueAmount}</td>
          <td className="last-cell">
            <button onClick={() => handleEditBlue(blue)} className="small-btn">
              <AiOutlineEdit className="edit" />
            </button>
            <button
              onClick={() => handleDeleteAdBlue(blue.id)}
              className="small-btn"
            >
              <MdDeleteOutline />
            </button>
          </td>
        </tr>
      ))}
      {modalStatus && modalType === 'blue' && <FuelEditForm />}
    </Fragment>
  );
};
export default AdBlueTableRow;
