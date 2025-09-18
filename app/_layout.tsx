import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from 'expo-font';
import Toast from "react-native-toast-message";


export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  const [loaded] = useFonts({
    "SpaceGrotesk": require("./../assets/fonts/SpaceGrotesk.ttf"),
    "SpaceGrotesk-Bold": require("./../assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Medium": require("./../assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Light": require("./../assets/fonts/SpaceGrotesk-Light.ttf"),
    "SpaceGrotesk-Regular": require("./../assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-SemiBold": require("./../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  })
  if (loaded) { null }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FAFAFA' },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(user)" />
        <Stack.Screen name="(coach)" />
        <Stack.Screen name="(scanner)" /> 
        <Stack.Screen name="shared" /> 
      </Stack>
      <Toast />

    </QueryClientProvider>

  );
}