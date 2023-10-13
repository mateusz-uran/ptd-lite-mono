import { Text, View } from "@react-pdf/renderer";
import React from "react";

const FourthRowContent = ({ cargoInfo }) => {
  return (
    <>
      <View
        style={{
          border: "1px solid black",
          borderTop: "0",
          borderRight: "0",
          display: "flex",
          flexDirection: "column",
          width: "330px",
          height: "110px",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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
              6
            </Text>
            <Text style={{ fontSize: "5", fontWeight: "light" }}>
              Cechy i numery {"\n"} Kennizeichen und Namm {"\n"} Marks and Nos
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
                alignSelf: "center",
                fontSize: "7",
                fontWeight: "700",
                padding: "0 3",
              }}
            >
              7
            </Text>
            <Text style={{ fontSize: "5", fontWeight: "light" }}>
              Ilośc sztuk {"\n"} Anzahl der Packstuck {"\n"} Nature of the goods
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
                alignSelf: "center",
                fontSize: "7",
                fontWeight: "700",
                padding: "0 3",
              }}
            >
              8
            </Text>
            <Text style={{ fontSize: "5", fontWeight: "light" }}>
              Sposób opakowania {"\n"} Art. Der Verrcpackung {"\n"} Method of
              packing
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
                alignSelf: "center",
                fontSize: "7",
                fontWeight: "700",
                padding: "0 3",
              }}
            >
              9
            </Text>
            <Text style={{ fontSize: "5", fontWeight: "light" }}>
              Rodzaj towaru {"\n"} Bezeichung des Gutes {"\n"} nature of the
              goods
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            height: "100%",
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
            {cargoInfo.info}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderTop: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column", fontSize: "5" }}>
            <Text style={{ marginLeft: "10", marginBottom: "2" }}>Klasa</Text>
            <Text style={{ marginLeft: "10", marginBottom: "2" }}>Klasse</Text>
            <Text style={{ marginLeft: "10", marginBottom: "2" }}>Class</Text>
          </View>
          <View style={{ flexDirection: "column", fontSize: "5" }}>
            <Text>Liczba</Text>
            <Text>Ziffer</Text>
            <Text>Number</Text>
          </View>
          <View style={{ flexDirection: "column", fontSize: "5" }}>
            <Text>Litera</Text>
            <Text>Buchstabe</Text>
            <Text>Letter</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              fontSize: "5",
              marginRight: "40",
              justifyContent: "center",
            }}
          >
            <Text>(ADR*)</Text>
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
          width: "220px",
          height: "110px",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "90",
            borderRight: "1px solid black",
          }}
        >
          <Text
            style={{
              fontSize: "6",
              padding: "3",
              fontWeight: "700",
            }}
          >
            10
          </Text>
          <Text style={{ fontSize: "5" }}>
            Nr statyczny{"\n"}Statistik nummer{"\n"}Statistical number
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "60",
            borderRight: "1px solid black",
          }}
        >
          <Text style={{ fontSize: "6", fontWeight: "700", padding: "3" }}>
            11
          </Text>
          <Text style={{ fontSize: "5" }}>
            Waga brutto w kg{"\n"}Bruttogewicht in kg{"\n"}Gross weight in kg
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "70",
            borderRight: "1px solid black",
          }}
        >
          <Text style={{ fontSize: "6", fontWeight: "700", padding: "3" }}>
            12
          </Text>
          <Text style={{ fontSize: "5" }}>
            Objętośc w m³{"\n"}Umfang in m³{"\n"}Volume in m³
          </Text>
        </View>
      </View>
    </>
  );
};

export default FourthRowContent;
