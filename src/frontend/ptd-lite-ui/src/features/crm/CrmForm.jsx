import React, { useState } from "react";
import "../../css/crm.css";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import CRMViewer from "./CRMViewer";
import { useDispatch } from "react-redux";
import { saveForm } from "./slices/crmFormSlice";

const CRMForm = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, getValues, setValue } = useForm();
  const dispatch = useDispatch();

  const [moveSenderAddress, setMoveSenderAddress] = useState(false);

  const [moveReceiverAddress, setMoveReceiverAddress] = useState(false);
  const [moveSender, setMoveSender] = useState(false);

  const handleCrmGeneration = (data) => {
    var sender = {
      senderName: data.senderName,
      addressSender1: data.addressSender1,
      addressSender2: data.addressSender2,
      senderCountry: data.senderCountry,
    };
    var receiver = {
      receiverName: data.receiverName,
      addressReceiver1: data.addressReceiver1,
      addressReceiver2: data.addressReceiver2,
    };
    var delivery = {
      addressDelivery: data.addressDelivery,
    };
    var placeLoading = {
      addressLoading: data.addressLoading,
    };
    var cargoInfo = {
      info: data.cargoInfo,
    };
    var cargoInstructions = {
      instructions: data.cargoInstructions,
    };
    var signature = {
      signatureName: data.signatureName,
      addressSignature1: data.addressSignature1,
      addressSignature2: data.addressSignature2,
      signatureCountry: data.signatureCountry,
    };
    var carrier = {
      carrierName: data.carrier,
    };

    dispatch(
      saveForm({
        sender,
        receiver,
        delivery,
        placeLoading,
        cargoInfo,
        cargoInstructions,
        signature,
        carrier,
      })
    );
  };

  const handleMoveSenderAddress = (event) => {
    setMoveSenderAddress(event.target.checked);
    if (event.target.checked) {
      setValue("addressLoading", getValues("addressSender2"));
    } else {
      setValue("addressLoading", "");
    }
  };

  const handleMoveReceiverAddress = (event) => {
    setMoveReceiverAddress(event.target.checked);
    if (event.target.checked) {
      setValue("addressDelivery", getValues("addressReceiver2"));
    } else {
      setValue("addressDelivery", "");
    }
  };

  const handleMoveSender = (event) => {
    setMoveSender(event.target.checked);
    if (event.target.checked) {
      setValue("signatureName", getValues("senderName"));
      setValue("addressSignature1", getValues("addressSender1"));
      setValue("addressSignature2", getValues("addressSender2"));
      setValue("signatureCountry", getValues("senderCountry"));
    } else {
      setValue("signatureName", "");
      setValue("addressSignature1", "");
      setValue("addressSignature2", "");
      setValue("signatureCountry", "");
    }
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
          <form onSubmit={handleSubmit(handleCrmGeneration)}>
            <div className="row sender">
              <div className="sender">
                <h5>Sender</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="senderName"
                  {...register("senderName")}
                  placeholder="name"
                  disabled={moveSender}
                />
                <input
                  className="primary-input"
                  type="text"
                  name="addressSender1"
                  {...register("addressSender1")}
                  placeholder="Address"
                  disabled={moveSender}
                />
                <div className="address-2-wrapper">
                  <input
                    className="primary-input"
                    type="text"
                    name="addressSender2"
                    {...register("addressSender2")}
                    placeholder="Address 2"
                    disabled={moveSenderAddress || moveSender}
                  />
                  <div className="mover-wrapper">
                    <p>Move</p>
                    <input
                      type="checkbox"
                      name="senderCheck"
                      value="address-2"
                      checked={moveSenderAddress}
                      onChange={handleMoveSenderAddress}
                    />
                  </div>
                </div>
                <input
                  className="primary-input"
                  type="text"
                  name="senderCountry"
                  {...register("senderCountry")}
                  placeholder="Country"
                  disabled={moveSender}
                />
                <div className="sender-check-wrapper">
                  <p>Same in signature</p>
                  <input
                    type="checkbox"
                    name="senderCheck"
                    value="sender"
                    checked={moveSender}
                    onChange={handleMoveSender}
                  />
                </div>
              </div>
              <div className="receiver">
                <h5>Receiver</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="receiverName"
                  {...register("receiverName")}
                  placeholder="name"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="addressReceiver1"
                  {...register("addressReceiver1")}
                  placeholder="Address"
                />
                <div className="address-2-wrapper">
                  <input
                    className="primary-input"
                    type="text"
                    name="addressReceiver2"
                    {...register("addressReceiver2")}
                    placeholder="Address 2"
                    disabled={moveReceiverAddress}
                  />
                  <div className="mover-wrapper">
                    <p>Move</p>
                    <input
                      type="checkbox"
                      name="receiverCheck"
                      value="address-2"
                      checked={moveReceiverAddress}
                      onChange={handleMoveReceiverAddress}
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
                  name="addressDelivery"
                  {...register("addressDelivery")}
                  placeholder="Address"
                />
              </div>
              <div className="place-loading">
                <h5>Loading place</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="addressLoading"
                  {...register("addressLoading")}
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="row cargo-informations">
              <div className="cargo-info">
                <h5>Cargo informations</h5>
                <textarea
                  className="primary-input"
                  name="cargoInfo"
                  {...register("cargoInfo")}
                  placeholder="Cargo info"
                />
              </div>
            </div>
            <div className="row cargo-instructions">
              <div className="cargo-instructions">
                <h5>Cargo instructions</h5>
                <textarea
                  className="primary-input"
                  name="cargoInstructions"
                  {...register("cargoInstructions")}
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
                  name="signatureName"
                  {...register("signatureName")}
                  placeholder="name"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="addressSignature1"
                  {...register("addressSignature1")}
                  placeholder="Address"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="addressSignature2"
                  {...register("addressSignature2")}
                  placeholder="Address 2"
                />
                <input
                  className="primary-input"
                  type="text"
                  name="signatureCountry"
                  {...register("signatureCountry")}
                  placeholder="Country"
                />
              </div>
              <div className="carrier">
                <h5>Carrier information</h5>
                <input
                  className="primary-input"
                  type="text"
                  name="carrier"
                  {...register("carrier")}
                  placeholder="carrier"
                />
              </div>
            </div>
            <div className="buttons">
              <button type="button" className="secondary-btn">
                Wyczyść
              </button>
              <button type="submit" className="primary-btn">
                Generuj
              </button>
            </div>
          </form>
        </div>
        <div className="crm-wrapper">
          <CRMViewer />
        </div>
      </div>
    </>
  );
};

export default CRMForm;
