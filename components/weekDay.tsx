import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { WeekDays, DayProps, Months, nth } from "../constants/constants";
import db, { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function WeekDay(data: DayProps) {

  const [classes, setClasses] = useState<number>(0);
  const [hws, setHws] = useState<number>(0);

  const onTotalClassesChange = (snaphot: FirebaseDatabaseTypes.DataSnapshot) => {
    if(snaphot.val()){
      const values: string[] = Object.values(snaphot.val());
      setClasses(values.length);
    } else {
      setClasses(0);
    }
  }

  const onTotalHwsChange = (snaphot: FirebaseDatabaseTypes.DataSnapshot) => {
    if(snaphot.val()){
      const values: string[] = Object.values(snaphot.val());
      setHws(values.length);
    } else {
      setHws(0);
    }
  }

  useEffect(() => {
    const user = auth().currentUser;
    const refPath = `/users/${user?.uid}/${data.day}subject`;

    db()
      .ref(refPath)
      .orderByKey()
      .on('value', onTotalClassesChange);

    return () => db().ref(refPath).off('value', onTotalClassesChange);
  });

  useEffect(() => {
    const user = auth().currentUser;
    const refPath = `/users/${user?.uid}/${data.date}homework`;

    db()
      .ref(refPath)
      .orderByKey()
      .on('value', onTotalHwsChange);

    return () => db().ref(refPath).off('value', onTotalHwsChange);
  });

  return (
    <View style={styles.root}>
      <View style={{marginRight: 'auto'}}>
        <Text style={styles.dayTitle}>{WeekDays[data.day]}</Text>
        <Text style={styles.date}>{data.date}{nth(data.date)} of {Months[data.month]}</Text>
      </View>
      <View style={{marginLeft: 'auto', justifyContent: 'center'}}>
        <Text style={styles.info}>{classes} Class(es)</Text>
        <Text style={styles.info}>{hws} Homework(s)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 'auto',
    height: 93,
    borderWidth: 1,
    padding: 15,
    flexDirection: 'row',
  },

  dayTitle: {
    fontSize: 30,
    fontFamily: 'Jost-Regular',
  },

  date: {
    fontSize: 12,
    fontFamily: 'Jost-Regular'
  },

  info: {
    fontSize: 15,
    fontFamily: 'Jost-Regular'
  }
});
