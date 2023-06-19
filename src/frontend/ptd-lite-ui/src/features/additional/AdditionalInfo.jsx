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
    dispatch(saveAdditionalData(data));
  };

  return (
    <section className="additional-info">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-wrapper">
          {formInputs.map((input) => (
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
