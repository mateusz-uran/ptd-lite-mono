import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import CRMReadyPDF from "./CRMReadyPDF";
import "../../css/crm.css";
import { useSelector } from "react-redux";
import {
  cargoInfo,
  cargoInstructions,
  carrier,
  delivery,
  placeLoading,
  receiver,
  sender,
  signature,
} from "./slices/crmFormSlice";

const CRMViewer = () => {
  const senderForm = useSelector(sender);
  const receiverForm = useSelector(receiver);
  const carrierForm = useSelector(carrier);
  const deliveryForm = useSelector(delivery);
  const placeLoadingForm = useSelector(placeLoading);
  const cargoInfoForm = useSelector(cargoInfo);
  const cargoInstructionsForm = useSelector(cargoInstructions);
  const signatureForm = useSelector(signature);

  return (
    <PDFViewer className="pdf-viewer">
      <CRMReadyPDF
        firstPage={senderForm}
        secondPage={{ receiverForm, carrierForm }}
        thirdPage={{ deliveryForm, placeLoadingForm }}
        fourthPage={cargoInfoForm}
        fifthPage={cargoInstructionsForm}
        sixthPage={{ placeLoadingForm, signatureForm }}
      />
    </PDFViewer>
  );
};

export default CRMViewer;
