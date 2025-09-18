import React from 'react';
import {KeyboardWrapper} from "@components/index";
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <KeyboardWrapper>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f7f7f7' },
        }}
      >
        <Stack.Screen name="scanScreen" />
        <Stack.Screen name="changeClass" />
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