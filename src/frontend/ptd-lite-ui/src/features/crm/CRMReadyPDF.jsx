import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import FirstRowContent from "./components/FirstRowContent";
import SecondRowContent from "./components/SecondRowContent";
import ThirdRowContent from "./components/ThirdRowContent";
import FourthRowContent from "./components/FourthRowContent";
import FifthRowContent from "./components/FifthRowContent";

const CRMReadyPDF = () => {
  const styles = StyleSheet.create({
    page: {
      margin: "15 15",
    },
    table: {
      flexDirection: "column",
    },
    row: {
      flexDirection: "row",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.row}>
            <FirstRowContent />
          </View>
          <View style={styles.row}>
            <SecondRowContent />
          </View>
          <View style={styles.row}>
            <ThirdRowContent />
          </View>
          <View style={styles.row}>
            <FourthRowContent />
          </View>
          <View style={styles.row}>
            <FifthRowContent />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CRMReadyPDF;
