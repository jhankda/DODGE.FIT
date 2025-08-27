import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";


export default function AuthLayout() {
  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#1a1a1a',

          },
        }}
      >
        <Stack.Screen name="signIn" />
        <Stack.Screen name="resetPassword" />
        <Stack.Screen name="forgotPassword" />
        <Stack.Screen name="verifyOTP" />
        <Stack.Screen name="signUp" />
      </Stack>
    </>
  );
}