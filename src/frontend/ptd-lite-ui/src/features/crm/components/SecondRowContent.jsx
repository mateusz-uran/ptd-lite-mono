import { Text, View } from "@react-pdf/renderer";
import React from "react";

const SecondRowContent = ({ receiver, carrier }) => {
  return (
    <>
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
                fontWeight: "700",
                padding: "0 3",
              }}
            >
              2
            </Text>
            <Text style={{ fontSize: "5", fontWeight: "light" }}>
              Odbiorca (nazwisko lub nazwa, adres, kraj) {"\n"} Empfanger (Name,
              Anschrift, Land) {"\n"} Consignee (name, address, country)
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
                marginLeft: "5px",
                padding: "0 3",
                fontSize: "10px",
                fontWeight: "700",
              }}
            >
              {receiver.receiverName} {"\n"}
              {receiver.addressReceiver1} {"\n"}
              {receiver.addressReceiver2} {"\n"}
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
          height: "80px",
        }}
      >
        <View style={{ width: "100%", justifyContent: "space-between" }}>
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
                fontWeight: "700",
                padding: "0 3",
              }}
            >
              16
            </Text>
            <Text style={{ fontSize: "5", fontWeight: "light" }}>
              Przewoźnik (nazwisko lub nazwa, adres, kraj) {"\n"} EFrachtfuhrer
              (Name, Anschrift, Land) {"\n"} Carrier (name, address, country)
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: "5px",
                padding: "0 3",
                fontSize: "10px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {carrier.carrierName} {"\n"}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default SecondRowContent;
