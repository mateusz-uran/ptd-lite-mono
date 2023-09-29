import { Text, View } from "@react-pdf/renderer";
import React from "react";

const FifthRowContent = () => {
  return (
    <>
      <View
        style={{
          border: "1px solid black",
          borderTop: "0",
          display: "flex",
          flexDirection: "column",
          width: "550px",
          height: "250px",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "column",
              borderBottom: "1px solid black",
              height: "150px",
              width: "250px",
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
                  fontWeight: "bold",
                  padding: "0 3",
                }}
              >
                13
              </Text>
              <Text
                style={{
                  fontSize: "5",
                  fontWeight: "light",
                  alignSelf: "center",
                }}
              >
                Instrukcje nadawcy / Anwisungen des Absenders / Sender`s
                instructions
              </Text>
            </View>
            <View style={{ height: "80%" }}>
              <Text style={{ paddingTop: "10" }}>dynamic 1</Text>
              <Text style={{ paddingTop: "15" }}>dynamic 2</Text>
            </View>
            <View style={{ textAlign: "center" }}>
              <Text style={{ fontSize: "5" }}>
                Po zaladunku proszę wpiszac numer plomby
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              borderBottom: "1px solid black",
              borderLeft: "1px solid black",
              height: "150px",
              width: "300px",
            }}
          >
            <View
              style={{
                height: "130px",
                borderBottom: "1px solid black",
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
                    fontWeight: "bold",
                    padding: "0 3",
                  }}
                >
                  19
                </Text>
                <Text style={{ fontSize: "5", fontWeight: "light" }}>
                  Postanowienia specjalne {"\n"} Besondere Vereinbarungen {"\n"}
                  Special agreements
                </Text>
              </View>
            </View>
            <View
              style={{
                height: "80px",
              }}
            >
              <View
                style={{
                  height: "50px",
                  fontSize: "5",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    border: "1px solid black",
                  }}
                >
                  <Text style={{ padding: "3" }}>20</Text>
                  <View
                    style={{
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text>Do zapłacenia</Text>
                    <Text>Zu zahlen vom</Text>
                    <Text>To be paid by</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    border: "1px solid black",
                  }}
                >
                  <Text>Waluta</Text>
                  <Text>Wahrung</Text>
                  <Text>Currency</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid black",
                  }}
                >
                  <Text>WARTOŚĆ</Text>
                </View>
              </View>
              <View
                style={{
                  height: "40px",
                  fontSize: "5",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    border: "1px solid black",
                  }}
                >
                  <Text>Przewożone</Text>
                  <Text>Frach</Text>
                  <Text>Carraige charges</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    border: "1px solid black",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    border: "1px solid black",
                  }}
                ></View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "column",
              height: "100px",
              width: "250px",
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
                  fontWeight: "bold",
                  padding: "0 3",
                }}
              >
                14
              </Text>
              <Text
                style={{
                  fontSize: "5",
                  fontWeight: "light",
                  alignSelf: "center",
                }}
              >
                Postanowienia odnośnie przewoźnego - nadawca / odbiorca
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              height: "100px",
              width: "300px",
              borderLeft: "1px solid black",
            }}
          >
            <View
              style={{
                height: "40px",
                fontSize: "5",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  border: "1px solid black",
                }}
              >
                <Text>Dopłaty</Text>
                <Text>Nebengebuhren</Text>
                <Text>Supplem. charges</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  border: "1px solid black",
                  width: "100%",
                }}
              ></View>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  border: "1px solid black",
                }}
              ></View>
            </View>
            <View
              style={{
                height: "40px",
                fontSize: "5",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  border: "1px solid black",
                }}
              >
                <Text>Koszty dodatkowe</Text>
                <Text>Sonstiges </Text>
                <Text>Miscellaneous</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  border: "1px solid black",
                }}
              ></View>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  border: "1px solid black",
                }}
              ></View>
            </View>
            <View
              style={{
                height: "40px",
                fontSize: "5",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  border: "1px solid black",
                }}
              >
                <Text>Ubezpieczenie</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  border: "1px solid black",
                }}
              ></View>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  border: "1px solid black",
                }}
              ></View>
            </View>
            <View
              style={{
                height: "40px",
                fontSize: "5",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  border: "1px solid black",
                }}
              >
                <Text>Razem</Text>
                <Text>Gesamtsumme</Text>
                <Text>Total to be paid</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  border: "1px solid black",
                  width: "100%",
                }}
              ></View>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  border: "1px solid black",
                }}
              ></View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default FifthRowContent;
