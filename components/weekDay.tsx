import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { WeekDays, DayProps, Months, nth, getWeekNumber } from "../constants/constants";
import db, { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WeekDay(data: DayProps) {
  const [classes, setClasses] = useState<number>(0);
  const [hws, setHws] = useState<number>(0);
  const week_num = getWeekNumber(data.CalendarDay);

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

  const onTotalHomeworksChange = (
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

      setHws(cnt);
    }
  };

  useEffect(() => {
    const user = auth().currentUser;
    const refPath1 = `/users/${user?.uid}/${data.day}subject`;
    const refPath2 = `/users/${user?.uid}/week${week_num}/day${data.day}`;

    db().ref(refPath1).orderByKey().on("value", onTotalClassesChange);
    db().ref(refPath2).orderByKey().on("value", onTotalHomeworksChange);
    () => db().ref(refPath1).off("value", onTotalClassesChange);
    () => db().ref(refPath2).off("value", onTotalHomeworksChange);
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
    width: windowWidth,
    height: "auto",
    borderWidth: 1,
    padding: windowHeight / 60,
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
