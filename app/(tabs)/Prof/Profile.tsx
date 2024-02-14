import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth'
import db from '@react-native-firebase/database'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const user = auth().currentUser;

const ProfilePicture = () => {
  if (user?.photoURL) {
    return (
      <Image source={{ uri: user.photoURL }} style={styles.image} />
    );
  }
}

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');

  db().ref(`/users/${user?.uid}/firstName`).once('value', (data) => {
    setFirstName(data.val());
  });

  db().ref(`/users/${user?.uid}/lastName`).once('value', (data) => {
    setLastName(data.val());
  });

  db().ref(`/users/${user?.uid}/school`).once('value', (data) => {
    setSchool(data.val());
  });

  db().ref(`/users/${user?.uid}/grade`).once('value', (data) => {
    setGrade(data.val());
  });

  const saveFirstName = (firstName: string) => {
    db().ref(`/users/${user?.uid}/firstName`).set(firstName);
  }

  const saveLastName = (lastName: string) => {
    db().ref(`/users/${user?.uid}/lastName`).set(lastName);
  }

  const saveSchool = (school: string) => {
    db().ref(`/users/${user?.uid}/school`).set(school);
  }

  const saveGrade = (grade: string) => {
    db().ref(`/users/${user?.uid}/grade`).set(grade);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.heading}>Your Profile</Text>
          <ProfilePicture />
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your first name"
              placeholderTextColor={'#C7C8CC'}
              value={firstName}
              onChangeText={text => {
                setFirstName(text)
                saveFirstName(text)
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your last name"
              placeholderTextColor={'#C7C8CC'}
              value={lastName}
              onChangeText={text => {
                setLastName(text)
                saveLastName(text)
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Grade</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your grade"
              placeholderTextColor={'#C7C8CC'}
              value={grade}
              onChangeText={text => {
                setGrade(text)
                saveGrade(text)
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>School</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your school"
              placeholderTextColor={'#C7C8CC'}
              value={school}
              onChangeText={text => {
                setSchool(text)
                saveSchool(text)
              }}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <Text style={styles.textInput}>{user?.email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profileContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    textAlign: 'center',
    elevation: 5,
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Jost-Regular',
    marginBottom: 20,
    color: '#3498db',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#3498db',
    marginBottom: 8,
    fontFamily: 'Jost-Regular',
  },
  textInput: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Jost-Regular',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    marginLeft: 'auto'
  }
});

export default ProfilePage;
