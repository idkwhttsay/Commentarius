import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import 'expo-dev-client'
import * as SplashScreen from 'expo-splash-screen';


import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import GoogleText from '../components/GoogleText';

SplashScreen.preventAutoHideAsync();

export default function HomePage() {
    GoogleSignin.configure({
        webClientId: '499505743608-2p1pf3982oi1rfi1k5ssq3defgmc4k5r.apps.googleusercontent.com',
    });

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        const userGoogleSignIn = auth().signInWithCredential(googleCredential);
        userGoogleSignIn.then((user) => {
            console.log("USER: ", user);
        }).catch((error) => {
            console.log(error);
        });
    }

    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<FirebaseAuthTypes.UserCredential | null>(null);

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const [fontsLoaded] = useFonts({
      'Jost-Regular': require('../assets/fonts/Jost-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
      if(fontsLoaded) {
        SplashScreen.hideAsync()
      }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
      return null;
    }

	if(!user){
        return (
            <SafeAreaView style={styles.view}>
                <View style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LottieView 
                        source={require('../assets/images/Loader.json')}
                        autoPlay
                        loop={true}
                        style={{width: 400, height: 400}}
                    />
                </View>
                <Text style={styles.big}>Welcome!</Text>
                <GoogleText />
                <View style={styles.container}>
                    <GoogleSigninButton 
                        style={{width: 200, height: 50}}
                        onPress={() => onGoogleButtonPress().then(() => {router.push('/(tabs)/Current/CurrentWeek')})}
                    />
                </View>
            </SafeAreaView>
        );
	} else {
		router.push('/(tabs)/Current/CurrentWeek');
	}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    big: {
        fontFamily: 'Jost-Regular',
        fontSize: 50,
        color: '#2A9DF4',
    },

    log: {
        fontFamily: 'Jost-Regular',
        fontSize: 28,
        color: '#2A9DF4',
    },
});