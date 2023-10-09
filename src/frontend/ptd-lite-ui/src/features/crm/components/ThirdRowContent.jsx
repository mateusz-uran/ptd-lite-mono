import { Text, View } from "@react-pdf/renderer";
import React from "react";

const ThirdRowContent = ({ delivery, placeLoading }) => {
  return (
    <>
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            border: "1px solid black",
            borderTop: "0",
            borderRight: "0",
            display: "flex",
            flexDirection: "row",
            width: "250px",
            height: "40px",
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
                Miejsce przeznaczenia (miejscowość, kraj) {"\n"}
                Ausileferungsort des Gutes {"\n"} Place of delivery of the goods
                (pace, cuntry)
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginLeft: "5px",
                  padding: "0 3",
                  fontSize: "10px",
                }}
              >
                {delivery.addressDelivery}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            border: "1px solid black",
            borderTop: "0",
            borderRight: "0",
            display: "flex",
            flexDirection: "row",
            width: "250px",
            height: "70px",
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
                Ort und Tag der Ubernahme des Gutes (Ort, Land) {"\n"} Place and
                date taking over the goods (pace, cuntry, date)
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginLeft: "5px",
                  padding: "0 3",
                  fontSize: "10px",
                }}
              >
                {placeLoading.addressLoading}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            border: "1px solid black",
            borderTop: "0",
            borderRight: "0",
            display: "flex",
            flexDirection: "row",
            width: "250px",
            height: "30px",
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
                5
              </Text>
              <Text style={{ fontSize: "5", fontWeight: "light" }}>
                Załączone dokumenty {"\n"}
                Belgfulgte Dokumente {"\n"} Documents attached
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            border: "1px solid black",
            borderTop: "0",
            display: "flex",
            flexDirection: "row",
            width: "300px",
            height: "50px",
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
          </View>
        </View>
        <View
          style={{
            border: "1px solid black",
            borderTop: "0",
            display: "flex",
            flexDirection: "row",
            width: "300px",
            height: "90px",
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
                  alignSelf: "flex-start",
                  fontSize: "7",
                  fontWeight: "bold",
                  padding: "5 3",
                }}
              >
                17
              </Text>
              <Text style={{ fontSize: "5", fontWeight: "light" }}>
                Zastrzerzenia i uwagi przewoźnika {"\n"}
                Vorbehalte und Bemerkungen der Frachtfuhrer
                {"\n"} Carrier`s reservations and Observations {"\n"}
                {"\n"}
                Jakosc i stan towarów nie sprawdzany przez przewoźnika{"\n"}
                Bez odpowiedzialności za faktyczną zawartość opakowań
                {"\n"}
                {"\n"}
                Qualitat und Zustand der Ware durch Frachtfuhrer nicht
                kontrolliert{"\n"}
                Ohne Verntwortuht fur tatsachlichen Inhalt der Varpackungen.
                {"\n"}
                {"\n"}
                Qwality and condition of goods not examined by the carrier{"\n"}
                Without responibility for the real contents of package.
                {"\n"}
                {"\n"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ThirdRowContent;
