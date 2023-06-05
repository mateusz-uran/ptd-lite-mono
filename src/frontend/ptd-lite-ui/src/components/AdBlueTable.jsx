const AdBlueTable = ({ adBlue }) => {
  const shouldRenderMinimumRows = adBlue.length < 5;
  const emptyRowCount = shouldRenderMinimumRows ? 5 - adBlue.length : 0;
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Location</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {adBlue.map((blue, i) => (
          <tr key={i}>
            <td>{blue.date}</td>
            <td>{blue.localization}</td>
            <td>{blue.amount}</td>
          </tr>
        ))}

        {emptyRowCount > 0 && (
          <tr className="empty-row">
            <td colSpan={4} style={{ height: `${emptyRowCount * 25}px` }}>
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
export default AdBlueTable;
