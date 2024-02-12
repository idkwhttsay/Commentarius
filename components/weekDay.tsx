import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { WeekDays, DayProps, Months, nth } from "../constants/constants";
import db, { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

export default function WeekDay(data: DayProps) {
  const [classes, setClasses] = useState<number>(0);
  const [hws, setHws] = useState<number>(0);

  const onTotalClassesChange = (
    snaphot: FirebaseDatabaseTypes.DataSnapshot
  ) => {
    if (snaphot.val()) {
      const values: string[] = Object.values(snaphot.val());
      var cnt = 0;
      for (let i = 0; i < values.length; ++i) {
        if (values[i] != null) {
          cnt++;
        }
      }

      setClasses(cnt);
    }
  };

  useEffect(() => {
    const user = auth().currentUser;
    const refPath1 = `/users/${user?.uid}/${data.day}subject`;

    db().ref(refPath1).orderByKey().on("value", onTotalClassesChange);
    () => db().ref(refPath1).off("value", onTotalClassesChange);
    return;
  });

  return (
    <View style={styles.root}>
      <View style={{ marginRight: "auto" }}>
        <Text style={styles.dayTitle}>{WeekDays[data.day]}</Text>
        <Text style={styles.date}>
          {data.date}
          {nth(data.date)} of {Months[data.month]}
        </Text>
      </View>
      <View style={{ marginLeft: "auto", justifyContent: "center" }}>
        <Text style={styles.info}>{classes} Class(es)</Text>
        <Text style={styles.info}>{hws} Homework(s)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "auto",
    height: 93,
    borderWidth: 1,
    padding: 15,
    flexDirection: "row",
  },

  dayTitle: {
    fontSize: 30,
    fontFamily: "Jost-Regular",
  },

  date: {
    fontSize: 12,
    fontFamily: "Jost-Regular",
  },

  info: {
    fontSize: 15,
    fontFamily: "Jost-Regular",
  },
});
