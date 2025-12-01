import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AuthService from './services/AuthService';
import SetupScreen from './screens/SetupScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';

type AppState = 'loading' | 'setup' | 'auth' | 'home';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');

  const authService = new AuthService();

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    const hasMasterPassword = await authService.hasMasterPassword();
    setAppState(hasMasterPassword ? 'auth' : 'setup');
  };

  const handleSetupComplete = () => {
    setAppState('home');
  };

  const handleAuthenticated = () => {
    setAppState('home');
  };

  const handleLock = () => {
    setAppState('auth');
  };

  if (appState === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {appState === 'setup' && <SetupScreen onSetupComplete={handleSetupComplete} />}
      {appState === 'auth' && <AuthScreen onAuthenticated={handleAuthenticated} />}
      {appState === 'home' && <HomeScreen onLock={handleLock} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
