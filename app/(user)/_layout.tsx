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
          contentStyle: { backgroundColor: '#FAFAFA' },
        }}
      >
        <Stack.Screen name="(subpages)" />
        <Stack.Screen name="tabs" />
        <Stack.Screen name="secondary" />
        {/* <Stack.Screen name="tabs/myClass" /> */}
        {/* <Stack.Screen name="(admin)" />
        <Stack.Screen name="(scanner)" /> */}
      </Stack>
    </>
  );
}