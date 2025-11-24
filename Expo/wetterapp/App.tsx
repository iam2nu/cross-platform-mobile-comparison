import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WeatherScreen } from './src/screens';

export default function App() {
    return (
        <SafeAreaProvider>
            <WeatherScreen />
        </SafeAreaProvider>
    );
}
