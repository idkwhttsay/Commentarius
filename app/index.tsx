import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import { useFonts } from "expo-font";
import { router } from "expo-router";
import "expo-dev-client";
import * as SplashScreen from "expo-splash-screen";

import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import GoogleText from "../components/GoogleText";

SplashScreen.preventAutoHideAsync();

export default function HomePage() {
  GoogleSignin.configure({
    webClientId:
      "499505743608-2p1pf3982oi1rfi1k5ssq3defgmc4k5r.apps.googleusercontent.com",
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userGoogleSignIn = auth().signInWithCredential(googleCredential);
    userGoogleSignIn.then((user) => {
      console.log("USER: ", user);
    }).catch((error) => {
      console.log(error);
    });
  };

  const [fontsLoaded] = useFonts({
    "Jost-Regular": require("../assets/fonts/Jost-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  if (initializing) return null;

  return (
    <SafeAreaView style={styles.view}>
      <View style={{
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <LottieView
          source={require("../assets/images/Loader.json")}
          autoPlay
          loop={true}
          style={{ width: 400, height: 400 }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.big}>Welcome!</Text>
        <GoogleText />
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          onPress={() =>
            onGoogleButtonPress().then(() => {
              router.push("/(tabs)/Current/CurrentWeek");
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  big: {
    fontFamily: "Jost-Regular",
    fontSize: 50,
    color: "#2A9DF4",
  },

  log: {
    fontFamily: "Jost-Regular",
    fontSize: 28,
    color: "#2A9DF4",
  },
});
