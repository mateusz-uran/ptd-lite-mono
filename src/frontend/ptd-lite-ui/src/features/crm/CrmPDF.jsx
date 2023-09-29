import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import CRM from "../../assets/CMR-cropped.png";

import React from "react";

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

const CrmPDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View
              style={{
                border: "1px solid black",
                borderRight: "0",
                display: "flex",
                flexDirection: "row",
                width: "250px",
                height: "80px",
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: "7",
                      fontWeight: "bold",
                      padding: "0 3",
                    }}
                  >
                    1
                  </Text>
                  <Text style={{ fontSize: "5", fontWeight: "light" }}>
                    Nadawca (nazwisko lub nazwa, adres, kraj) {"\n"} Absander
                    (Name, Anschrift, Land) {"\n"} Sander (name, address,
                    country)
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "15 0",
                  }}
                >
                  <Text
                    style={{
                      padding: "0 3",
                    }}
                  >
                    &nbsp;
                  </Text>
                  <Text>DYNAMIC TEXT</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                border: "1px solid black",
                display: "flex",
                flexDirection: "row",
                width: "300px",
                height: "80px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontSize: "5" }}>
                    MIEDZYNARODOWY SAMOCHODOWY LIST PRZEWOZOWY {"\n"}
                    INTERNATIONALER FRACHTBRIEF {"\n"} INTERNATIONAL CONSIGNMENT
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      height: "35%",
                      width: "70%",
                      justifyContent: "space-evenly",
                      marginBottom: "3px",
                    }}
                  >
                    <Image
                      src={CRM}
                      style={{
                        height: "100%",
                      }}
                    ></Image>
                    <Text style={{ fontSize: "4" }}>No. …………………………</Text>
                  </View>
                  <Text style={{ fontSize: "4" }}>
                    Niniejszy przewóz podlega postanowieniom konwencji o umowie
                    międzynarodowej przewozu {"\n"} drogowego towarów (CMR) bez
                    względu na jakąkolwiek przeciwną klauzulę
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: "4", width: "50%" }}>
                    Diese Beforder unterliegt trotz einer gegen- {"\n"}
                    teiling Abmachung den Bestimungen des {"\n"}
                    Ubereintkoments uber den Beforderungsvertrag {"\n"}
                    im internationalen Strassenguterverkher (CMR) {"\n"}
                  </Text>
                  <Text style={{ fontSize: "4" }}>
                    This carriage is subject notwithstanding any{"\n"}
                    clause to the contrary, to the Convention{"\n"}
                    on the Contract for the International{"\n"}
                    Carriage of goods by road (CMR){"\n"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View
              style={{
                border: "1px solid black",
                borderTop: "0",
                borderRight: "0",
                display: "flex",
                flexDirection: "row",
                width: "250px",
                height: "80px",
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: "7",
                      fontWeight: "bold",
                      padding: "0 3",
                    }}
                  >
                    2
                  </Text>
                  <Text style={{ fontSize: "5", fontWeight: "light" }}>
                    Odbiorca (nazwisko lub nazwa, adres, kraj) {"\n"} Empfanger
                    (Name, Anschrift, Land) {"\n"} Consignee (name, address,
                    country)
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "15 0",
                  }}
                >
                  <Text
                    style={{
                      padding: "0 3",
                    }}
                  >
                    &nbsp;
                  </Text>
                  <Text>DYNAMIC TEXT</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                border: "1px solid black",
                borderTop: "0",
                display: "flex",
                flexDirection: "row",
                width: "300px",
                height: "80px",
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: "7",
                      fontWeight: "bold",
                      padding: "0 3",
                    }}
                  >
                    16
                  </Text>
                  <Text style={{ fontSize: "5", fontWeight: "light" }}>
                    Przewoźnik (nazwisko lub nazwa, adres, kraj) {"\n"}{" "}
                    EFrachtfuhrer (Name, Anschrift, Land) {"\n"} Carrier (name,
                    address, country)
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View
              style={{
                border: "1px solid black",
                borderTop: "0",
                borderRight: "0",
                display: "flex",
                flexDirection: "row",
                width: "250px",
                height: "55px",
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: "7",
                      fontWeight: "bold",
                      padding: "0 3",
                    }}
                  >
                    3
                  </Text>
                  <Text style={{ fontSize: "5", fontWeight: "light" }}>
                    Miejsce przeznaczenia (miejscowość, kraj) {"\n"}{" "}
                    Ausileferungsort des Gutes {"\n"} Place of delivery of the
                    goods (pace, cuntry)
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "15 0",
                  }}
                >
                  <Text
                    style={{
                      padding: "0 3",
                    }}
                  >
                    &nbsp;
                  </Text>
                  <Text>DYNAMIC TEXT</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                border: "1px solid black",
                borderTop: "0",
                display: "flex",
                flexDirection: "row",
                width: "300px",
                height: "80x",
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: "7",
                      fontWeight: "bold",
                      padding: "0 3",
                    }}
                  >
                    17
                  </Text>
                  <Text style={{ fontSize: "5", fontWeight: "light" }}>
                    Kolejni przewoźnicy (nazwisko lub nazwa, adres, kraj) {"\n"}
                    Nachtuhrer Frachtfuhrer (Name, Anschrift, Land)
                    {"\n"} Successive (name, adress, country)
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "15 0",
                  }}
                >
                  <Text
                    style={{
                      padding: "0 3",
                    }}
                  >
                    &nbsp;
                  </Text>
                  <Text>DYNAMIC TEXT</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View
              style={{
                border: "1px solid black",
                borderTop: "0",
                borderRight: "0",
                display: "flex",
                flexDirection: "row",
                width: "250px",
                height: "55px",
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: "7",
                      fontWeight: "bold",
                      padding: "0 3",
                    }}
                  >
                    4
                  </Text>
                  <Text style={{ fontSize: "5", fontWeight: "light" }}>
                    Miejsce i data załadowania (miejscowość, kraj, data) {"\n"}
                    Ort und Tag der Ubernahme des Gutes (Ort, Land) {"\n"} Place
                    and date taking over the goods (pace, cuntry, date)
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "15 0",
                  }}
                >
                  <Text
                    style={{
                      padding: "0 3",
                    }}
                  >
                    &nbsp;
                  </Text>
                  <Text>DYNAMIC TEXT</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CrmPDF;
