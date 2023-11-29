import { View, Text, StyleSheet, Button, Animated, Easing, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Link } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function HomePage() {
    const spinValue = new Animated.Value(0);

    const rotate = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    
    const spin = () => {
      spinValue.setValue(0),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    }

    useEffect(() => {
      spin();
    }, []);

    const icon = require('../assets/images/adaptive-icon.png');

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
            <View style={styles.container}>
              <Animated.View style={{transform: [{rotate}]}}>
                <Image style={{
                  flex: 1,
                  resizeMode: 'center'
                }} source={icon}/>
              </Animated.View>
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
            <Link style={{flex: 1}} href="/Current/CurrentWeek" asChild>
                <Button title="Login with Google acoount" />
            </Link>
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
