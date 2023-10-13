import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";
import React from "react";
import FirstRowContent from "./components/FirstRowContent";
import SecondRowContent from "./components/SecondRowContent";
import ThirdRowContent from "./components/ThirdRowContent";
import FourthRowContent from "./components/FourthRowContent";
import FifthRowContent from "./components/FifthRowContent";
import SixthRowContent from "./components/SixthRowContent";

const CRMReadyPDF = ({
  firstPage,
  secondPage,
  thirdPage,
  fourthPage,
  fifthPage,
  sixthPage,
}) => {
  // Register Font
  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
  });

  const styles = StyleSheet.create({
    page: {
      margin: "15 15",
      fontFamily: "Roboto",
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
            <FirstRowContent sender={firstPage} />
          </View>
          <View style={styles.row}>
            <SecondRowContent
              receiver={secondPage.receiverForm}
              carrier={secondPage.carrierForm}
            />
          </View>
          <View style={styles.row}>
            <ThirdRowContent
              delivery={thirdPage.deliveryForm}
              placeLoading={thirdPage.placeLoadingForm}
            />
          </View>
          <View style={styles.row}>
            <FourthRowContent cargoInfo={fourthPage} />
          </View>
          <View style={styles.row}>
            <FifthRowContent cargoInsturctions={fifthPage} />
          </View>
          <View style={styles.row}>
            <SixthRowContent
              placeLoading={sixthPage.placeLoadingForm}
              signature={sixthPage.signatureForm}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CRMReadyPDF;
