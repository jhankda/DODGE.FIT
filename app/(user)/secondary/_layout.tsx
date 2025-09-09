import React from 'react';
import KeyboardWrapper from "@components/FormScreen";
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <KeyboardWrapper>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a1a' },
        }}
      >
        <Stack.Screen name="myQR" />
        {/* <Stack.Screen name="(us" /> */}
        {/*
         <Stack.Screen name="(coach)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="(scanner)" /> 
        */}
      </Stack>
    </KeyboardWrapper>
  );
}