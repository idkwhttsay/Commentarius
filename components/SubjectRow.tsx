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

  const [subject, setSubject] = useState<string>("");
  const [homework, setHomework] = useState<string>("");

  const saveSubject = async (sbj: string) => {
    if (sbj) {
      await db()
        .ref(`/users/${user?.uid}/${data.dayNumber}subject/${data.rowNumber}`)
        .set(sbj);
    } else {
      await db()
        .ref(`/users/${user?.uid}/${data.dayNumber}subject/${data.rowNumber}`)
        .set(null);
    }
  };

  const saveHomework = async (hw: string) => {
    if (hw) {
      await db()
        .ref(
          `/users/${user?.uid}/${cur.getDate()}-${cur.getMonth()}/homework/${
            data.rowNumber
          }`
        )
        .set(hw);
    } else {
      await db()
        .ref(
          `/users/${user?.uid}/${cur.getDate()}-${cur.getMonth()}/homework/${
            data.rowNumber
          }`
        )
        .set(null);
    }
  };

  const onSubjectChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    setSubject(snapshot.val());
  };

  const onHwChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    setHomework(snapshot.val());
  };

  useEffect(() => {
    const refPath1 = `/users/${user?.uid}/${data.dayNumber}subject/${data.rowNumber}`;
    const refPath2 = `/users/${
      user?.uid
    }/${cur.getDate()}-${cur.getMonth()}/homework/${data.rowNumber}`;

    db().ref(refPath1).orderByKey().on("value", onSubjectChange);

    db().ref(refPath2).orderByKey().on("value", onHwChange);

    () => db().ref(refPath1).off("value", onSubjectChange);
    () => db().ref(refPath2).off("value", onHwChange);
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
