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
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.push("/Current/0");
          }}
        >
          <WeekDay
            date={Sunday.getDate()}
            day={Sunday.getDay()}
            month={Sunday.getMonth()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.push("/Current/1");
          }}
        >
          <WeekDay
            date={Monday.getDate()}
            day={Monday.getDay()}
            month={Monday.getMonth()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.push("/Current/2");
          }}
        >
          <WeekDay
            date={Tuesday.getDate()}
            day={Tuesday.getDay()}
            month={Tuesday.getMonth()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.push("/Current/3");
          }}
        >
          <WeekDay
            date={Wednesday.getDate()}
            day={Wednesday.getDay()}
            month={Wednesday.getMonth()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.push("/Current/4");
          }}
        >
          <WeekDay
            date={Thursday.getDate()}
            day={Thursday.getDay()}
            month={Thursday.getMonth()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.push("/Current/5");
          }}
        >
          <WeekDay
            date={Friday.getDate()}
            day={Friday.getDay()}
            month={Friday.getMonth()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.push("/Current/6");
          }}
        >
          <WeekDay
            date={Saturday.getDate()}
            day={Saturday.getDay()}
            month={Saturday.getMonth()}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
