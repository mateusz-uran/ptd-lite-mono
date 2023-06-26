import { AiOutlineEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { Fragment, useState } from 'react';
import { useDeletePetrolMutation } from '../../api/petrol/petrolApiSlice';
import { useDispatch } from 'react-redux';
import { startEditing } from '../../features/trips/tripUpdateSlice';
import { startEditingFuel } from '../../features/fuel/fuelEditSlice';

const PetrolTableRow = ({ petrolEntities }) => {
  const dispatch = useDispatch();
  const [deletePetrol] = useDeletePetrolMutation();
  const handleEditPetrol = (petrolId) => {
    console.log('edit');
    dispatch(startEditingFuel({ name: 'petrol', objectId: petrolId }));
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
            <button onClick={() => handleEditPetrol(fuel.id)}>
              <AiOutlineEdit className="edit" />
            </button>
            <button onClick={() => handleDeletePetrol(fuel.id)}>
              <MdDeleteOutline />
            </button>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};
export default PetrolTableRow;
