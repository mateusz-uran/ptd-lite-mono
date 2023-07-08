import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { Fragment } from 'react';
import { useDeletePetrolMutation } from '../../../api/petrol/petrolApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  editType,
  isModalOpen,
  startEditingFuel,
} from '../slices/fuelEditSlice';
import FuelEditForm from '../forms/FuelEditForm';

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
          <td className="manage-cell-wrapper">
            <div className="manage-cell">
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
            </div>
          </td>
        </tr>
      ))}
      {modalStatus && modalType === 'petrol' && <FuelEditForm />}
    </Fragment>
  );
};
export default PetrolTableRow;
