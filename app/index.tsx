import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { ExpoRoot, router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';
import db from "@react-native-firebase/database";

SplashScreen.preventAutoHideAsync();

export default function HomePage() {
    const webClientId = "499505743608-3ml0o4ia4k15kim4invd4jctcih60p9f.apps.googleusercontent.com"; 

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: webClientId,
        })
    },[])

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            // console.log("idToken:", idToken);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
            } else {
                console.log(error.message)
            }
        }
    };

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
                <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.log}>Log into your </Text>
                    <Text
                        style={{
                            color: '#4285F4',
                            fontSize: 28,
                            fontFamily: 'Jost-Regular',
                        }}
                    >G</Text>
                    <Text
                        style={{
                            color: '#DB4437',
                            fontSize: 28,
                            fontFamily: 'Jost-Regular',
                        }}
                    >o</Text>
                    <Text
                        style={{
                            color: '#F4B400',
                            fontSize: 28,
                            fontFamily: 'Jost-Regular',
                        }}
                    >o</Text>
                    <Text
                        style={{
                            color: '#4285F4',
                            fontSize: 28,
                            fontFamily: 'Jost-Regular',
                        }}
                    >g</Text>
                    <Text
                        style={{
                            color: '#0F9D58',
                            fontSize: 28,
                            fontFamily: 'Jost-Regular',
                        }}
                    >l</Text>
                    <Text
                        style={{
                            color: '#DB4437',
                            fontSize: 28,
                            fontFamily: 'Jost-Regular',
                        }}
                    >e{' '}</Text>
                    <Text style={styles.log}>account</Text>
                </View>
                <View style={styles.container}>
                    <GoogleSigninButton 
                        onPress={googleLogin}
                        style={{width: 200, height: 50}}
                    />
                </View>
            </SafeAreaView>
        );
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

