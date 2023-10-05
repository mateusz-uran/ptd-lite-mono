import { Text, View } from "@react-pdf/renderer";
import React from "react";

const SixthRowContent = () => {
  return (
    <View
      style={{
        border: "1px solid black",
        borderTop: "0",
        borderRight: "0",
        display: "flex",
        flexDirection: "column",
        width: "550px",
        height: "120px",
      }}
    >
      <View
        style={{
          borderBottom: "1px solid black",
          borderRight: "1px solid black",
          height: "50",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "55%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "20%",
            }}
          >
            <Text
              style={{
                fontSize: "7",
                fontWeight: "bold",
                padding: "0 3",
              }}
            >
              21
            </Text>
            <Text style={{ fontSize: "5", fontWeight: "light" }}>
              Wystawiono w {"\n"} Ausgefertigt in {"\n"}
              Established in
            </Text>
          </View>
          <View style={{ width: "60%" }}>
            <Text style={{ fontSize: "5", alignSelf: "center" }}>
              dnia / am / on
            </Text>
            <View style={{ border: "1px solid black", marginTop: "15" }}>
              <Text style={{ fontSize: "8", fontWeight: "bold", padding: "5" }}>
                dynamic text
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ borderLeft: "1px solid black", width: "45%", fontSize: "5" }}
        >
          <View
            style={{
              borderBottom: "1px solid black",
              height: "50%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ width: "20%", textAlign: "center" }}>15</Text>
            <Text>Zapłata/ Ruckerstattung / Cash on deliver</Text>
          </View>
          <View>&nbsp;</View>
        </View>
      </View>
      <View
        style={{
          borderRight: "1px solid black",
          height: "70",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "250px" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: "5", padding: "0 3" }}>22</Text>
            <View style={{ height: "70", justifyContent: "space-between" }}>
              <View>
                <Text>dynamic text</Text>
              </View>
              <View
                style={{
                  height: "30%",
                }}
              >
                <Text
                  style={{
                    fontSize: "5",
                    fontWeight: "light",
                  }}
                >
                  Podpis i stempel nadawcy {"\n"} Unterschrift und Stempel
                  Absenders {"\n"} Signature and stamp of the sender
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: "150px", borderLeft: "1px solid black" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: "5", padding: "0 3" }}>23</Text>
            <View style={{ height: "70", justifyContent: "space-between" }}>
              <Text>&nbsp;</Text>
              <View
                style={{
                  height: "30%",
                }}
              >
                <Text
                  style={{
                    fontSize: "5",
                    fontWeight: "light",
                  }}
                >
                  Podpis i stempel przewoźnika
                  {"\n"} Unterschrift und Stempel des Frachtfuhrers {"\n"}
                  Signature and stamp of the carrier
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "150px",
            borderLeft: "1px solid black",
            fontSize: "5",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: "5", padding: "0 3" }}>23</Text>
            <View style={{ height: "70", justifyContent: "space-between" }}>
              <Text style={{ fontSize: "5" }}>
                Przesylkę otrzymano / Gut empfangen / Goods recived
              </Text>
              <View
                style={{
                  height: "30%",
                }}
              >
                <Text
                  style={{
                    fontSize: "5",
                    fontWeight: "light",
                  }}
                >
                  Podpis i stempel odbiorcy
                  {"\n"} Unterschrift und Stempel des Empfangers {"\n"}
                  Signature and stamp of the cosignee
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SixthRowContent;
