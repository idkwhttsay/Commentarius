import { View, StyleSheet } from "react-native";
import React from "react";
import WeekDay from "../../../components/weekDay";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function CurrentWeek() {
  var cur = new Date();
  var x = cur.getDay();
  var Sunday = new Date();
  Sunday.setDate(Sunday.getDate() - x);
  var Monday = new Date();
  Monday.setDate(Monday.getDate() - (x - 1));
  var Tuesday = new Date();
  Tuesday.setDate(Tuesday.getDate() - (x - 2));
  var Wednesday = new Date();
  Wednesday.setDate(Wednesday.getDate() - (x - 3));
  var Thursday = new Date();
  Thursday.setDate(Thursday.getDate() - (x - 4));
  var Friday = new Date();
  Friday.setDate(Friday.getDate() - (x - 5));
  var Saturday = new Date();
  Saturday.setDate(Saturday.getDate() - (x - 6));

  const router = useRouter();

  return (
    <View style={styles.container}>
      <WeekDay
        CalendarDay={Sunday}
        date={Sunday.getDate()}
        day={Sunday.getDay()}
        month={Sunday.getMonth()}
        currentWeek={true}
        ind={0}
      />
      <WeekDay
        CalendarDay={Monday}
        date={Monday.getDate()}
        day={Monday.getDay()}
        month={Monday.getMonth()}
        currentWeek={true}
        ind={1}
      />
      <WeekDay
        CalendarDay={Tuesday}
        date={Tuesday.getDate()}
        day={Tuesday.getDay()}
        month={Tuesday.getMonth()}
        currentWeek={true}
        ind={2}
      />
      <WeekDay
        CalendarDay={Wednesday}
        date={Wednesday.getDate()}
        day={Wednesday.getDay()}
        month={Wednesday.getMonth()}
        currentWeek={true}
        ind={3}
      />
      <WeekDay
        CalendarDay={Thursday}
        date={Thursday.getDate()}
        day={Thursday.getDay()}
        month={Thursday.getMonth()}
        currentWeek={true}
        ind={4}
      />
      <WeekDay
        CalendarDay={Friday}
        date={Friday.getDate()}
        day={Friday.getDay()}
        month={Friday.getMonth()}
        currentWeek={true}
        ind={5}
      />
      <WeekDay
        CalendarDay={Saturday}
        date={Saturday.getDate()}
        day={Saturday.getDay()}
        month={Saturday.getMonth()}
        currentWeek={true}
        ind={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
