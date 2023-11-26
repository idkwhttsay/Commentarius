import React from 'react'
import { Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Tabs screenOptions={{
        tabBarStyle: {
            backgroundColor: '#2A9DF4',
        },

        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#000000'
    }}>
        <Tabs.Screen name='Current' options={{
            headerShown: false,
            tabBarLabel: 'This week',
        }}/>
        <Tabs.Screen name='Next' options={{
            headerShown: false,
            tabBarLabel: 'Next week'
        }}
        />
    </Tabs>
  )
}