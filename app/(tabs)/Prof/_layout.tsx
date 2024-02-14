import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#2A9DF4",
                },
                headerTintColor: "#FFFFFF",
            }}
        >
            <Stack.Screen name="Profile" options={{
                headerTitleStyle: {
                    fontSize: 25,
                    fontFamily: "Jost-Regular",
                },
                headerTitle: 'Commentarius'
            }} />
        </Stack>
    );
}
