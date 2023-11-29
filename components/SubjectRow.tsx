import { View, Text, TouchableWithoutFeedback, TextInput, Keyboard, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export interface SubjectRowProps {
  rowNumber: number;
}

export default function SubjectRow(data: SubjectRowProps) {
  const [subject, setSubject] = useState('');
  const [homework, setHomework] = useState('');

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
              defaultValue={subject}
              onChangeText={newSubject => setSubject(newSubject)}
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