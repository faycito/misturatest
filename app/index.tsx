// app/index.tsx
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import LoginScreen from './auth/LoginScreen';

export default function Index() {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) return null;

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <LoginScreen />;
}
