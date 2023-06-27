import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { Fragment } from 'react';
import { useDeletePetrolMutation } from '../../api/petrol/petrolApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  editType,
  isModalOpen,
  startEditingFuel,
} from '../../features/fuel/fuelEditSlice';
import FuelEditForm from '../../features/fuel/FuelEditForm';

const PetrolTableRow = ({ petrolEntities }) => {
  const dispatch = useDispatch();
  const [deletePetrol] = useDeletePetrolMutation();
  const modalStatus = useSelector(isModalOpen);
  const modalType = useSelector(editType);

  const handleEditPetrol = (petrol) => {
    dispatch(startEditingFuel({ name: 'petrol', object: petrol }));
  };

  const handleDeletePetrol = async (petrolId) => {
    await deletePetrol(petrolId).unwrap();
  };

  return (
    <Fragment>
      {petrolEntities.map((fuel, i) => (
        <tr key={i}>
          <td>{fuel.refuelingDate}</td>
          <td>{fuel.refuelingLocation}</td>
          <td>{fuel.vehicleCounter}</td>
          <td>{fuel.refuelingAmount}</td>
          <td>{fuel.paymentMethod}</td>
          <td className="last-cell">
            <button
              onClick={() => handleEditPetrol(fuel)}
              className="small-btn"
            >
              <AiOutlineEdit className="edit" />
            </button>
            <button
              onClick={() => handleDeletePetrol(fuel.id)}
              className="small-btn"
            >
              <MdDeleteOutline />
            </button>
          </td>
        </tr>
      ))}
      {modalStatus && modalType === 'petrol' && <FuelEditForm />}
    </Fragment>
  );
};
export default PetrolTableRow;
