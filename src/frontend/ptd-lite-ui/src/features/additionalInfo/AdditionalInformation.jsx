import "../../css/additional_info.css";
import { MdSettingsBackupRestore } from "react-icons/md";
import { useForm } from "react-hook-form";
import { translateAdditionalInputs } from "./additionalInputs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdditionalInfo, saveAdditionalData } from "./additionalInfoSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AdditionalInformation = ({ cardId }) => {
  const { t } = useTranslation();
  const formInputs = translateAdditionalInputs();
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
    const additionalData = {
      ...data,
      selectedCardId: Number(cardId),
    };
    try {
      dispatch(saveAdditionalData(additionalData));
      toast.success(t("toastify.additionalAddSuccess"));
    } catch (err) {
      console.log("Cant save additional info: ", err);
      toast.error(t("toastify.additionalAddFail"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="additional-info">
      <div className="window-wrapper">
        <div className="sector">
          <h5>{t("misc.petrolTruck")}</h5>
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
          <h5>{t("misc.petrolAgg")}</h5>
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
          <h5>{t("misc.tripsSumm")}</h5>
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
            <MdSettingsBackupRestore className="revert" /> {t("buttons.clear")}
          </button>
          <button className="primary-btn">{t("buttons.submit")}</button>
        </div>
      </div>
    </form>
  );
};
export default AdditionalInformation;
