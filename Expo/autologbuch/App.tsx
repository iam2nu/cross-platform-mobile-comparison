import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import database from './src/database/database';
import { theme } from './src/theme/theme';

export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        try {
            // Initialisiere Datenbank
            await database.init();

            // Kurze Verzögerung für Splash Screen
            await new Promise(resolve => setTimeout(resolve, 500));

            setIsReady(true);
        } catch (error) {
            console.error('Error initializing app:', error);
            // Auch bei Fehler fortfahren
            setIsReady(true);
        }
    };

    if (!isReady) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <>
            <StatusBar style="light" />
            <AppNavigator />
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
});
