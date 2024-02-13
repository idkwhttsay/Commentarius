import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import db, { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { getWeekNumber } from "../constants/constants";

export interface SubjectRowProps {
  rowNumber: number;
  dayNumber: number;
  currentWeek: boolean;
}

export default function SubjectRow(data: SubjectRowProps) {
  const user = auth().currentUser;

  var today = new Date();
  if (!data.currentWeek) {
    today.setDate(today.getDate() + 7);
  }

  var x = today.getDay();
  var cur = new Date();
  cur.setDate(today.getDate() - x + data.dayNumber);

  const week_num = getWeekNumber(cur);

  const [subject, setSubject] = useState<string>("");
  const [homework, setHomework] = useState<string>("");

  const saveSubject = async (sbj: string) => {
    const ref = `/users/${user?.uid}/${data.dayNumber}subject/${data.rowNumber}`;
    if (sbj) {
      await db().ref(ref).set(sbj);
    } else {
      await db().ref(ref).set(null);
    }
  };

  const saveHomework = async (hw: string) => {
    const ref = `/users/${user?.uid}/week${week_num}/day${data.dayNumber}/${data.rowNumber}`;
    if (hw) {
      await db().ref(ref).set(hw);
    } else {
      await db().ref(ref).set(null);
    }
  };

  const deletePreviousWeek = async () => {
    const ref = `/users/${user?.uid}/week${week_num - 2}`;
    await db().ref(ref).set(null);
  }

  const onSubjectChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    setSubject(snapshot.val());
  };

  const onHomeworkChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    setHomework(snapshot.val());
  };

  useEffect(() => {
    if (data.currentWeek) {
      deletePreviousWeek();
    }

    const refPath1 = `/users/${user?.uid}/${data.dayNumber}subject/${data.rowNumber}`;
    const refPath2 = `/users/${user?.uid}/week${week_num}/day${data.dayNumber}/${data.rowNumber}`;

    db().ref(refPath1).orderByKey().on("value", onSubjectChange);
    db().ref(refPath2).orderByKey().on("value", onHomeworkChange);

    () => db().ref(refPath1).off("value", onSubjectChange);
    () => db().ref(refPath2).off("value", onHomeworkChange);
    return;
  });

  return (
    <View
      style={{ flexDirection: "row", width: "auto", height: "auto", flex: 1 }}
    >
      <View style={styles.number}>
        <Text style={styles.body}>{data.rowNumber + 1}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={styles.subject}>
          <TextInput
            style={styles.body}
            placeholder="Subject"
            autoCorrect={false}
            multiline={true}
            value={subject}
            onChangeText={async (newSubject) => {
              setSubject(newSubject);
              saveSubject(newSubject);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={styles.homework}>
          <TextInput
            style={styles.body}
            placeholder="Homework"
            autoCorrect={false}
            multiline={true}
            value={homework}
            onChangeText={async (newHomework) => {
              setHomework(newHomework);
              saveHomework(newHomework);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
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

  body: {
    fontSize: 15,
    fontFamily: "Jost-Regular",
  },
});
