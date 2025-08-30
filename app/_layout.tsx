import React, { useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  const [loaded] = useFonts({
    "SpaceGrotesk": require("./../assets/fonts/SpaceGrotesk.ttf"),
  })
  if(loaded){null}

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
        {/*
         <Stack.Screen name="(coach)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="(scanner)" /> 
        */}
      </Stack>
    </QueryClientProvider>
  );
}