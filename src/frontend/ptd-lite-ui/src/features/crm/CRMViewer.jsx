import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import CRMReadyPDF from "./CRMReadyPDF";

const CRMViewer = () => {
  return (
    <PDFViewer width={1024} height={1400}>
      <CRMReadyPDF />
    </PDFViewer>
  );
};

export default CRMViewer;
