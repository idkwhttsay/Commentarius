import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { WeekDays, DayProps, Months, nth, getWeekNumber } from "../constants/constants";
import db, { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { TouchableHighlight } from "react-native-gesture-handler";
import { router } from "expo-router";

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
    <TouchableOpacity onPress={() => {
      if (data.currentWeek) {
        router.push(`/(tabs)/Current/${data.ind}`);
      } else {
        router.push(`/(tabs)/Next/${data.ind}`);
      }
    }} style={styles.root}>
      <View style={{ marginLeft: 10, justifyContent: 'center' }}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderWidth: 0.5,
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
