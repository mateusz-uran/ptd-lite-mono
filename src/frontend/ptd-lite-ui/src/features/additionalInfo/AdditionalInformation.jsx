import '../../css/additional_info.css';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import formInputs from './additionalInputs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdditionalInfo, saveAdditionalData } from './additionalInfoSlice';

const AdditionalInformation = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, reset } = useForm();
  const additionalInfo = useSelector(getAdditionalInfo);

  useEffect(() => {
    if (additionalInfo) {
      formInputs.forEach((input) => {
        setValue(input.name, additionalInfo[input.name]);
      });
    }
  }, [additionalInfo]);

  const onSubmit = (data) => {
    dispatch(saveAdditionalData(data));
    console.log(additionalInfo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="additional-info">
      <div className="window-wrapper">
        <div className="sector">
          <h5>Petrol - Truck</h5>
          {formInputs.slice(0, 2).map((input) => (
            <div key={input.name} className="petrol-part">
              <input
                type="text"
                placeholder={input.placeholder}
                disabled={input?.disabled}
                {...register(input.name)}
                className="primary-input"
              />
              <label htmlFor={input.name} className="primary-label">
                {input.label}
              </label>
            </div>
          ))}
        </div>
        <div className="sector">
          <h5>Petrol - Aggregate</h5>
          {formInputs.slice(2, 5).map((input) => (
            <div key={input.name} className="petrol-part">
              <input
                type="text"
                placeholder={input.placeholder}
                {...register(input.name)}
                className="primary-input"
              />
              <label htmlFor={input.name} className="primary-label">
                {input.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="window-wrapper">
        <div className="sector">
          <h5>Trips summary</h5>
          <div className="trip-part">
            {formInputs.slice(5, 7).map((input) => (
              <div key={input.name} className="input-wrapper">
                <input
                  type="text"
                  placeholder={input.placeholder}
                  {...register(input.name)}
                  className="primary-input"
                />
                <label htmlFor={input.name} className="primary-label">
                  {input.label}
                </label>
              </div>
            ))}
          </div>
          <div className="trip-part">
            {formInputs.slice(7, 10).map((input) => (
              <div key={input.name} className="input-wrapper">
                <input
                  type="text"
                  placeholder={input.placeholder}
                  {...register(input.name)}
                  className="primary-input"
                />
                <label htmlFor={input.name} className="primary-label">
                  {input.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="buttons-wrapper">
        <div className="buttons">
          <button onClick={() => reset()} className="small-btn">
            <MdSettingsBackupRestore className="revert" /> Clear
          </button>
          <button className="primary-btn">Submit</button>
        </div>
      </div>
    </form>
  );
};
export default AdditionalInformation;
