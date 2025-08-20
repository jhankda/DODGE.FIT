import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a1a' },
        }}
      >
        {/* <Stack.Screen name="splash" /> */}
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(user)" />
         {/*<Stack.Screen name="(coach)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="(scanner)" /> */}
      </Stack>
    </>
  );
}