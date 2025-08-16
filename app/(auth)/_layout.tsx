import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#1a1a1a', 
        
        },
      }}
    >
      <Stack.Screen name="signUp" />
      <Stack.Screen name="signIn" />
    </Stack>
  );
}