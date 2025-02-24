import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import SubjectRow from "../../../components/SubjectRow";

export default function Day() {
  const { id } = useLocalSearchParams();
  const num_id = Number(id);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flexDirection: "row", width: "auto", height: "auto", flex: 1 }}
      >
        <View style={styles.number}>
          <Text style={styles.header}>№</Text>
        </View>
        <View style={styles.subject}>
          <Text style={styles.header}>Subject</Text>
        </View>
        <View style={styles.homework}>
          <Text style={styles.header}>Homework</Text>
        </View>
      </View>

      <SubjectRow rowNumber={0} dayNumber={num_id} currentWeek={true} />
      <SubjectRow rowNumber={1} dayNumber={num_id} currentWeek={true} />
      <SubjectRow rowNumber={2} dayNumber={num_id} currentWeek={true} />
      <SubjectRow rowNumber={3} dayNumber={num_id} currentWeek={true} />
      <SubjectRow rowNumber={4} dayNumber={num_id} currentWeek={true} />
      <SubjectRow rowNumber={5} dayNumber={num_id} currentWeek={true} />
      <SubjectRow rowNumber={6} dayNumber={num_id} currentWeek={true} />
      <SubjectRow rowNumber={7} dayNumber={num_id} currentWeek={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  number: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  subject: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  homework: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  header: {
    textDecorationLine: "underline",
    color: "#1167B1",
    fontSize: 25,
    fontFamily: "Jost-Regular",
  },

  body: {
    fontSize: 15,
    fontFamily: "Jost-Regular",
  },
});
