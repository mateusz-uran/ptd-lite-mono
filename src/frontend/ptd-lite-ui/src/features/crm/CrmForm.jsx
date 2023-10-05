import React from "react";
import "../../css/crm.css";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import CRMViewer from "./CRMViewer";

const CRMForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Header
        compArray={[
          {
            compName: t("misc.dashboard"),
          },
          {
            compName: "CRM",
          },
        ]}
      />
      <div id="crm-form-wrapper">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row sender">
              <div className="sender">
                <h5>Sender</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="name"
                  placeholder="name"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="address-sender-1"
                  placeholder="Address"
                />
                <div className="address-2-wrapper">
                  <input
                    className="primary-input"
                    type="text"
                    name="address-sender-2"
                    placeholder="Address 2"
                  />
                  <div className="mover-wrapper">
                    <p>Move</p>
                    <input
                      type="checkbox"
                      name="sender-check"
                      value="address-2"
                    />
                  </div>
                </div>
                <input
                  className="primary-input"
                  type="text"
                  name="country"
                  placeholder="Country"
                />
                <div className="sender-check-wrapper">
                  <p>Same in signature</p>
                  <input type="checkbox" name="sender-check" value="sender" />
                </div>
              </div>
              <div className="receiver">
                <h5>Receiver</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="name"
                  placeholder="name"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="address-receiver-1"
                  placeholder="Address"
                />
                <div className="address-2-wrapper">
                  <input
                    className="primary-input"
                    type="text"
                    name="address-receiver-2"
                    placeholder="Address 2"
                  />
                  <div className="mover-wrapper">
                    <p>Move</p>
                    <input
                      type="checkbox"
                      name="receiver-check"
                      value="address-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row middle">
              <div className="delivery">
                <h5>Delivery</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="address-delivery"
                  placeholder="Address"
                />
              </div>
              <div className="place-loading">
                <h5>Loading place</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="address-loading"
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="row cargo-informations">
              <div className="cargo-info">
                <h5>Cargo informations</h5>
                <textarea
                  className="primary-input"
                  name="cargo-info"
                  placeholder="Cargo info"
                />
              </div>
            </div>
            <div className="row cargo-instructions">
              <div className="cargo-instructions">
                <h5>Cargo instructions</h5>
                <textarea
                  className="primary-input"
                  name="cargo-instructions"
                  placeholder="Cargo instructions"
                />
              </div>
            </div>
            <div className="row bottom">
              <div className="signature">
                <h5>Signature</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="signature-name"
                  placeholder="name"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="address-signature-1"
                  placeholder="Address"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="address-signature-2"
                  placeholder="Address 2"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="signature-country"
                  placeholder="Country"
                />
              </div>
              <div className="carrier">
                <h5>Carrier information</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="carrier"
                  placeholder="carrier"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="crm-reader">
          <CRMViewer />
        </div>
      </div>
    </>
  );
};

export default CRMForm;
