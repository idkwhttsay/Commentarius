import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { WeekDays, DayProps, Months, nth } from "../constants/constants";

export default function WeekDay(data: DayProps) {
  return (
    <View style={styles.root}>
      <View style={{marginRight: 'auto'}}>
        <Text style={styles.dayTitle}>{WeekDays[data.day]}</Text>
        <Text style={styles.date}>{data.date}{nth(data.date)} of {Months[data.month]}</Text>
      </View>
      <View style={{marginLeft: 'auto', justifyContent: 'center'}}>
        <Text style={styles.info}>TO DO: Show #Classes</Text>
        <Text style={styles.info}>TO DO: Show #Homework</Text>
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
