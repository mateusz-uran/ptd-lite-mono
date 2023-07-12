import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editType,
  isModalOpen,
  startEditingFuel,
} from '../slices/fuelEditSlice';
import { openModal } from '../../modal/slices/modalSlice';
import { useTranslation } from 'react-i18next';

const AdBlueTableRow = ({ blueEntities }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalStatus = useSelector(isModalOpen);
  const modalType = useSelector(editType);

  const handleEditBlue = (blue) => {
    dispatch(startEditingFuel({ name: 'blue', object: blue }));
  };

  const handleDeleteAdBlue = async (blueId) => {
    let blueDeletePayload = {
      objectId: blueId,
      message: t('misc.modalMessage'),
      method: 'deleteAdBlue',
    };
    dispatch(openModal(blueDeletePayload));
  };

  return (
    <Fragment>
      {blueEntities.map((blue, i) => (
        <tr key={i}>
          <td>{blue.adBlueDate}</td>
          <td>{blue.adBlueLocalization}</td>
          <td>{blue.adBlueAmount}</td>
          <td className="manage-cell-wrapper">
            <div className="manage-cell">
              <button
                onClick={() => handleEditBlue(blue)}
                className="small-btn"
              >
                <AiOutlineEdit className="edit" />
              </button>
              <button
                onClick={() => handleDeleteAdBlue(blue.id)}
                className="small-btn"
              >
                <MdDeleteOutline />
              </button>
            </div>
          </td>
        </tr>
      ))}
      {modalStatus && modalType === 'blue' && <FuelEditForm />}
    </Fragment>
  );
};
export default AdBlueTableRow;
