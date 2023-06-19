import { useForm } from 'react-hook-form';
import '../../css/additional_info.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAdditionalInfo, saveAdditionalData } from './additionalSlice';
import { useEffect } from 'react';
import formInputs from './additionalInputs';

const AdditionalInfo = () => {
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
    console.log(data);
    // dispatch(saveAdditionalData(data));
  };

  return (
    <section className="additional-info">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="truck-aggregate">
          <div className="petrol-truck">
            <h5>Petrol - Truck</h5>
            {formInputs.slice(0, 3).map((input) => (
              <div className="input-wrapper" key={input.name}>
                <input
                  type="text"
                  placeholder={input.placeholder}
                  disabled={input?.disabled}
                  {...register(input.name)}
                />
                <label htmlFor="">{input.label}</label>
              </div>
            ))}
          </div>
          <div className="petrol-aggregate">
            <h5>Petrol - Aggregate</h5>
            {formInputs.slice(3, 6).map((input) => (
              <div className="input-wrapper" key={input.name}>
                <input
                  type="text"
                  placeholder={input.placeholder}
                  {...register(input.name)}
                />
                <label htmlFor="">{input.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="trip-details-wrapper">
          <div className="trip-details">
            <h5>Trips summary</h5>
            <div className="trip-line">
              {formInputs.slice(6, 9).map((input) => (
                <div className="input-wrapper" key={input.name}>
                  <input
                    type="text"
                    placeholder={input.placeholder}
                    disabled={input?.disabled}
                    {...register(input.name)}
                  />
                  <label htmlFor="">{input.label}</label>
                </div>
              ))}
            </div>
            <div className="trip-line">
              {formInputs.slice(9).map((input) => (
                <div className="input-wrapper" key={input.name}>
                  <input
                    type="text"
                    placeholder={input.placeholder}
                    disabled={input?.disabled}
                    {...register(input.name)}
                  />
                  <label htmlFor="">{input.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="buttons-wrapper">
          <button>submit</button>
          <button>
            <i className="bx bx-reset"></i>
          </button>
        </div>
      </form>
    </section>
  );
};
export default AdditionalInfo;
