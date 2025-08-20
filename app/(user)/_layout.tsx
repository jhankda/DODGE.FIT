import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>

      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a1a' },
        }}
      >
        <Stack.Screen name="(sub=pages)" />
        <Stack.Screen name="tabs" />
        <Stack.Screen name="secondary" />
        {/* <Stack.Screen name="(admin)" />
        <Stack.Screen name="(scanner)" /> */}
      </Stack>
    </>
  );
}