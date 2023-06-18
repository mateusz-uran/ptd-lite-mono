import '../../css/additional_info.css';

const AdditionalInfo = () => {
  return (
    <section className="additional-info">
      <form>
        <div className="inputs-wrapper">
          <div className="fuel-truck">
            <h5>Fuel truck</h5>
            <div className="input-wrapper">
              <input type="text" placeholder="Initial state" />
              <label htmlFor="">Initial state</label>
            </div>
            <div className="input-wrapper">
              <input type="text" placeholder="Amount" />
              <label htmlFor="">Amount</label>
            </div>
            <div className="input-wrapper">
              <input type="text" placeholder="End state" />
              <label htmlFor="">End state</label>
            </div>
          </div>
          <div className="fuel-truck">
            <h5>Fuel Aggregate</h5>
            <div className="input-wrapper">
              <input type="text" placeholder="Initial state" />
              <label htmlFor="">Initial state</label>
            </div>
            <div className="input-wrapper">
              <input type="text" placeholder="Amount" />
              <label htmlFor="">Amount</label>
            </div>
            <div className="input-wrapper">
              <input type="text" placeholder="End state" />
              <label htmlFor="">End state</label>
            </div>
          </div>
          <div className="trip-final">
            <h5>Trip final information</h5>
            <div className="trip-final-wrapper">
              <div className="fuel-truck-col">
                <div className="input-wrapper">
                  <input type="text" placeholder="Kilometers" />
                  <label htmlFor="">Kilometers</label>
                </div>
                <div className="input-wrapper">
                  <input type="text" placeholder="Avg petrol" />
                  <label htmlFor="">Avg petrol</label>
                </div>
                <div className="input-wrapper">
                  <input type="text" placeholder="Total petrol" />
                  <label htmlFor="">Total petrol</label>
                </div>
              </div>
              <div className="fuel-truck-col">
                <div className="input-wrapper">
                  <input type="text" placeholder="Avg speed" />
                  <label htmlFor="">Avg speed</label>
                </div>
                <div className="input-wrapper">
                  <input type="text" placeholder="Idling consumption" />
                  <label htmlFor="">Idling consumption</label>
                </div>
                <div className="input-wrapper">
                  <input type="text" placeholder="Uneconomic speed" />
                  <label htmlFor="">Uneconomic speed</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          <button className="submit-button">Save</button>
          <button type="button" className="revert-button">
            <i className="bx bx-reset"></i>
          </button>
        </div>
      </form>
    </section>
  );
};
export default AdditionalInfo;
