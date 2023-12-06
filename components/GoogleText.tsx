import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function GoogleText() {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.log}>Log into your </Text>
      <Text
        style={{
          color: "#4285F4",
          fontSize: 28,
          fontFamily: "Jost-Regular",
        }}
      >
        G
      </Text>
      <Text
        style={{
          color: "#DB4437",
          fontSize: 28,
          fontFamily: "Jost-Regular",
        }}
      >
        o
      </Text>
      <Text
        style={{
          color: "#F4B400",
          fontSize: 28,
          fontFamily: "Jost-Regular",
        }}
      >
        o
      </Text>
      <Text
        style={{
          color: "#4285F4",
          fontSize: 28,
          fontFamily: "Jost-Regular",
        }}
      >
        g
      </Text>
      <Text
        style={{
          color: "#0F9D58",
          fontSize: 28,
          fontFamily: "Jost-Regular",
        }}
      >
        l
      </Text>
      <Text
        style={{
          color: "#DB4437",
          fontSize: 28,
          fontFamily: "Jost-Regular",
        }}
      >
        e{" "}
      </Text>
      <Text style={styles.log}>account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  log: {
    fontFamily: "Jost-Regular",
    fontSize: 28,
    color: "#2A9DF4",
  },
});
