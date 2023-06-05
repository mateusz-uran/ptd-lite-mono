const PetrolTable = ({ petrol }) => {
  const shouldRenderMinimumRows = petrol.length < 5;
  const emptyRowCount = shouldRenderMinimumRows ? 5 - petrol.length : 0;

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Location</th>
          <th>Counter</th>
          <th>Amount</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        {petrol.map((fuel, i) => (
          <tr key={i}>
            <td>{fuel.refuelingDate}</td>
            <td>{fuel.refuelingLocation}</td>
            <td>{fuel.vehicleCounter}</td>
            <td>{fuel.refuelingAmount}</td>
            <td>{fuel.paymentMethod}</td>
          </tr>
        ))}

        {emptyRowCount > 0 && (
          <tr className="empty-row">
            <td colSpan={5} style={{ height: `${emptyRowCount * 25}px` }}>
              <div className="empty-row-button">
                <button>
                  <span className="text">Add</span>
                  <i className="bx bx-message-square-add icon"></i>
                </button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PetrolTable;
