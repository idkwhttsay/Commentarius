import { View, Text, TouchableWithoutFeedback, TextInput, Keyboard, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import db, { FirebaseDatabaseTypes } from '@react-native-firebase/database';

export interface SubjectRowProps {
  rowNumber: number;
  dayNumber: number;
}

export default function SubjectRow(data: SubjectRowProps) {
  const user = auth().currentUser;

  const [subject, setSubject] = useState('');
  const [homework, setHomework] = useState('');

  const saveSubject = (subject: string) => {
    if(subject != ""){
      db().ref(`/users/${user?.uid}/${data.dayNumber}/subject/${data.rowNumber}`).set(subject);
    } else {
      db().ref(`/users/${user?.uid}/${data.dayNumber}/subject/${data.rowNumber}`).set(null);
    }
  }

  const onSubjectChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    setSubject(snapshot.val());
  }

  useEffect(() => {
    const refPath = `/users/${user?.uid}/${data.dayNumber}/subject/${data.rowNumber}`;

    db()
      .ref(refPath)
      .orderByKey()
      .on('value', onSubjectChange);

    return () => db().ref(refPath).off('value', onSubjectChange);
  });

  return (
    <View style={{flexDirection: 'row', width: 'auto', height: 'auto', flex: 1}}>
        <View style={styles.number}>
          <Text style={styles.body}>{data.rowNumber}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
          <View style={styles.subject}>
            <TextInput
              style={styles.body}
              placeholder='Subject'
              autoCorrect={false}
              multiline={true}
              value={subject}
              onChangeText={ async (newSubject) => {
                setSubject(newSubject)
                await saveSubject(newSubject);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
          <View style={styles.homework}>
            <TextInput
              style={styles.body}
              placeholder='Homework'
              autoCorrect={false}
              multiline={true}
              defaultValue={homework}
              onChangeText={newHomework => setHomework(newHomework)}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
  )
}

const styles = StyleSheet.create({
    number: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },
  
    subject: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },
  
    homework: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },
  
    body: {
      fontSize: 15,
      fontFamily: 'Jost-Regular',
    }
  })