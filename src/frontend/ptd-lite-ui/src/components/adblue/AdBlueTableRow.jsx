import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { Fragment } from 'react';

const AdBlueTableRow = ({ blueEntities }) => {
  const handleEditBlue = (blueId) => {};

  const handleDeleteAdBlue = async (blueId) => {};

  return (
    <Fragment>
      {blueEntities.map((blue, i) => (
        <tr key={i}>
          <td>{blue.adBlueDate}</td>
          <td>{blue.adBlueLocalization}</td>
          <td>{blue.adBlueAmount}</td>
          <td className="last-cell">
            <button onClick={() => handleEditBlue(blue.id)}>
              <AiOutlineEdit className="edit" />
            </button>
            <button onClick={() => handleDeleteAdBlue(blue.id)}>
              <MdDeleteOutline />
            </button>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};
export default AdBlueTableRow;
