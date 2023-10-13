import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { customFonts } from '../assets/fonts/fonts';

SplashScreen.preventAutoHideAsync();

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts(customFonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return {
    fontsLoaded,
    onLayoutRootView,
  };
};
