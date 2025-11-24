import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Fahrzeug, Fahrt } from '../models';

// Import screens (werden gleich erstellt)
import HomeScreen from '../screens/HomeScreen';
import FahrzeugDetailScreen from '../screens/FahrzeugDetailScreen';
import AddFahrzeugScreen from '../screens/AddFahrzeugScreen';
import AddWartungScreen from '../screens/AddWartungScreen';
import FahrtenListScreen from '../screens/FahrtenListScreen';
import ActiveFahrtScreen from '../screens/ActiveFahrtScreen';
import FahrtDetailScreen from '../screens/FahrtDetailScreen';

export type RootStackParamList = {
    Home: undefined;
    FahrzeugDetail: { fahrzeugId: number };
    AddFahrzeug: undefined;
    AddWartung: { fahrzeugId: number };
    FahrtenList: { fahrzeugId: number };
    ActiveFahrt: { fahrzeugId: number };
    FahrtDetail: { fahrtId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#2196F3',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Meine Fahrzeuge' }}
                />
                <Stack.Screen
                    name="FahrzeugDetail"
                    component={FahrzeugDetailScreen}
                    options={{ title: 'Fahrzeug Details' }}
                />
                <Stack.Screen
                    name="AddFahrzeug"
                    component={AddFahrzeugScreen}
                    options={{ title: 'Fahrzeug hinzufügen' }}
                />
                <Stack.Screen
                    name="AddWartung"
                    component={AddWartungScreen}
                    options={{ title: 'Wartung hinzufügen' }}
                />
                <Stack.Screen
                    name="FahrtenList"
                    component={FahrtenListScreen}
                    options={{ title: 'Fahrten-Logbuch' }}
                />
                <Stack.Screen
                    name="ActiveFahrt"
                    component={ActiveFahrtScreen}
                    options={{ title: 'Aktive Fahrt' }}
                />
                <Stack.Screen
                    name="FahrtDetail"
                    component={FahrtDetailScreen}
                    options={{ title: 'Fahrt Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
