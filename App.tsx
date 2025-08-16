import { useEffect, useState } from "react";
import { SplashScreen, Stack, useRouter } from "expo-router";
import {useFonts} from "expo-font"

console.log("ouside----------------------------------------------")

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        console.log("try---------------------------------------")
        const [fontsLoaded] = useFonts({
          'SpaceGrotesk':require('./assets/fonts/SpaceGrotesk-Regular.ttf')
        })

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        console.error(err);
      } finally {
        console.log("final-----------------------------------")
        setReady(true);
        SplashScreen.hideAsync();
      }
    }
    console.log("func--------------------------------")

    prepare();
  }, []);

  useEffect(() => {
    if (ready) {
      router.replace("./app/(auth)");
      console.log("ready------------------------------------------")
    }
  }, [ready]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

