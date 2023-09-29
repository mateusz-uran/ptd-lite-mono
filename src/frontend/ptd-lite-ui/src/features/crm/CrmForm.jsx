import React from "react";
import "../../css/crm.css";
import { PDFViewer } from "@react-pdf/renderer";
import CrmPDF from "./CrmPDF";
import CRMReadyPDF from "./CRMReadyPDF";

const CrmForm = () => {
  return (
    <PDFViewer width={1024} height={1400}>
      {/* <CrmPDF /> */}
      <CRMReadyPDF />
    </PDFViewer>
  );
};

export default CrmForm;
