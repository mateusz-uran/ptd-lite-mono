import { Fragment } from 'react';

const TripCargo = ({ group }) => {
  return (
    <Fragment>
      <div className="cargo">
        <div className="cargo-info">
          {group?.cargoName && <span>{group.cargoName}</span>}
          {group?.weight && <span>{group.weight}t</span>}
          {group?.temperature && <span>{group.temperature}°C</span>}
          {group?.notes && <span>{group.notes}</span>}
        </div>
        <div className="cargo-buttons">
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
    </Fragment>
  );
};
export default TripCargo;
