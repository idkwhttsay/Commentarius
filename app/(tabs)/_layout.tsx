import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar'

export default function _layout() {
  return (
    <Tabs screenOptions={{
        tabBarStyle: {
            backgroundColor: '#2A9DF4',
        },

        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#000000',
        tabBarLabelStyle: {
            fontSize: 13
        }

        
    }}>
        <Tabs.Screen name='Current' options={{
            headerShown: false,
            tabBarLabel: 'This week',
            tabBarIcon: () => <FontAwesomeIcon icon={faCalendar} />
        }}/>
        <Tabs.Screen name='Next' options={{
            headerShown: false,
            tabBarLabel: 'Next week',
            tabBarIcon: () => <FontAwesomeIcon icon={faCalendar} />
        }}
        />
    </Tabs>
  )
}