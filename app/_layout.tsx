import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ExpenseProvider } from '@/contexts/ExpenseContext';
import ToastManager from 'toastify-react-native'

SplashScreen.preventAutoHideAsync();

function Layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot/>
      <StatusBar style="auto" />
      <ToastManager/>
    </ThemeProvider>
  );
}

export default function RootLayout(){
  return (
    <ExpenseProvider>
      <AuthProvider>
        <Layout/>
      </AuthProvider>
    </ExpenseProvider>
  )
}