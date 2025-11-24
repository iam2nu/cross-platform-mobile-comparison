import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fahrt } from '../models';
import database from '../database/database';
import locationService, { Position } from '../services/locationService';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { format } from 'date-fns';

type Props = NativeStackScreenProps<RootStackParamList, 'ActiveFahrt'>;

export default function ActiveFahrtScreen({ route, navigation }: Props) {
    const { fahrzeugId } = route.params;
    const [currentFahrt, setCurrentFahrt] = useState<Fahrt | null>(null);
    const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
    const [currentDistanz, setCurrentDistanz] = useState(0);
    const [dauer, setDauer] = useState(0);
    const [loading, setLoading] = useState(true);

    const locationSubscription = useRef<{ remove: () => void } | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const lastPositionRef = useRef<Position | null>(null);

    useEffect(() => {
        initializeFahrt();

        return () => {
            if (locationSubscription.current) {
                locationSubscription.current.remove();
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const initializeFahrt = async () => {
        try {
            const activeFahrt = await database.getActiveFahrt(fahrzeugId);

            if (activeFahrt) {
                // Fortsetzen einer existierenden Fahrt
                setCurrentFahrt(activeFahrt);
                setCurrentDistanz(activeFahrt.distanzKm);
                startTimer(activeFahrt);
                startLocationTracking();
            } else {
                // Neue Fahrt starten
                await startNewFahrt();
            }
        } catch (error) {
            console.error('Error initializing fahrt:', error);
            Alert.alert('Fehler', 'Fahrt konnte nicht initialisiert werden');
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const startNewFahrt = async () => {
        // Prüfe Berechtigung
        const hasPermission = await locationService.requestLocationPermission();
        if (!hasPermission) {
            Alert.alert(
                'Berechtigung erforderlich',
                'Standort-Berechtigung wird benötigt, um Fahrten aufzuzeichnen.'
            );
            navigation.goBack();
            return;
        }

        // Hole aktuelle Position
        const position = await locationService.getCurrentPosition();
        if (!position) {
            Alert.alert('Fehler', 'Standort konnte nicht ermittelt werden');
            navigation.goBack();
            return;
        }

        // Hole Adresse (optional)
        const address = await locationService.getAddressFromCoordinates(
            position.latitude,
            position.longitude
        );

        // Erstelle neue Fahrt in Datenbank
        const fahrtId = await database.startFahrt({
            fahrzeugId,
            startZeit: new Date().toISOString(),
            startLatitude: position.latitude,
            startLongitude: position.longitude,
            istAbgeschlossen: false,
        });

        // Update mit Adresse wenn verfügbar
        if (address) {
            await database.updateFahrt(fahrtId, { startAdresse: address });
        }

        const fahrt = await database.getFahrtById(fahrtId);
        if (fahrt) {
            setCurrentFahrt(fahrt);
            setCurrentPosition(position);
            lastPositionRef.current = position;
            startTimer(fahrt);
            startLocationTracking();
        }
    };

    const startTimer = (fahrt: Fahrt) => {
        timerRef.current = setInterval(() => {
            const start = new Date(fahrt.startZeit);
            const now = new Date();
            const durationSec = Math.floor((now.getTime() - start.getTime()) / 1000);
            setDauer(durationSec);
        }, 1000);
    };

    const startLocationTracking = async () => {
        try {
            const subscription = await locationService.watchPosition(
                (position) => {
                    setCurrentPosition(position);

                    if (lastPositionRef.current) {
                        // Berechne Distanz seit letztem Update
                        const distanzDelta = locationService.calculateDistance(
                            lastPositionRef.current.latitude,
                            lastPositionRef.current.longitude,
                            position.latitude,
                            position.longitude
                        );

                        setCurrentDistanz((prev) => prev + distanzDelta);
                    }

                    lastPositionRef.current = position;
                },
                (error) => {
                    console.error('Location tracking error:', error);
                }
            );

            locationSubscription.current = subscription;
        } catch (error) {
            console.error('Error starting location tracking:', error);
        }
    };

    const handleEndFahrt = async () => {
        if (!currentFahrt || !currentPosition) return;

        Alert.alert(
            'Fahrt beenden?',
            `Distanz: ${currentDistanz.toFixed(1)} km\nDauer: ${formatDauer(dauer)}`,
            [
                { text: 'Abbrechen', style: 'cancel' },
                {
                    text: 'Beenden',
                    onPress: async () => {
                        try {
                            // Hole Endadresse
                            const endAddress = await locationService.getAddressFromCoordinates(
                                currentPosition.latitude,
                                currentPosition.longitude
                            );

                            await database.endFahrt(
                                currentFahrt.id,
                                new Date().toISOString(),
                                currentPosition.latitude,
                                currentPosition.longitude,
                                currentDistanz,
                                endAddress || undefined
                            );

                            navigation.goBack();
                        } catch (error) {
                            console.error('Error ending fahrt:', error);
                            Alert.alert('Fehler', 'Fahrt konnte nicht beendet werden');
                        }
                    },
                },
            ]
        );
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDauer = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}min`;
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.success} />
            </View>
        );
    }

    if (!currentFahrt) {
        return (
            <View style={styles.centerContainer}>
                <Text>Keine aktive Fahrt</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Status Card */}
                <View style={styles.statusCard}>
                    <Ionicons name="car" size={64} color={theme.colors.success} />
                    <Text style={styles.statusTitle}>Fahrt läuft</Text>
                    <Text style={styles.statusSubtitle}>
                        Seit {format(new Date(currentFahrt.startZeit), 'HH:mm:ss')}
                    </Text>
                </View>

                {/* Distanz */}
                <View style={styles.metricCard}>
                    <Text style={styles.metricLabel}>Distanz</Text>
                    <Text style={styles.metricValue}>{currentDistanz.toFixed(2)} km</Text>
                </View>

                {/* Dauer */}
                <View style={styles.metricCard}>
                    <Text style={styles.metricLabel}>Dauer</Text>
                    <Text style={styles.metricValueOrange}>{formatTime(dauer)}</Text>
                </View>

                {/* GPS Status */}
                <View style={styles.gpsCard}>
                    <Ionicons
                        name={currentPosition ? 'location' : 'location-outline'}
                        size={24}
                        color={currentPosition ? theme.colors.success : theme.colors.error}
                    />
                    <View style={styles.gpsText}>
                        <Text style={styles.gpsTitle}>GPS-Status</Text>
                        <Text style={styles.gpsSubtitle}>
                            {currentPosition
                                ? `Verbunden (${currentPosition.accuracy?.toFixed(0) || '?'}m Genauigkeit)`
                                : 'Keine Verbindung'}
                        </Text>
                    </View>
                </View>

                {/* Fahrt beenden Button */}
                <TouchableOpacity style={styles.endButton} onPress={handleEndFahrt}>
                    <Ionicons name="stop-circle" size={32} color="#fff" />
                    <Text style={styles.endButtonText}>Fahrt beenden</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    statusCard: {
        backgroundColor: '#E8F5E9',
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    statusTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.md,
    },
    statusSubtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
    },
    metricCard: {
        backgroundColor: '#fff',
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    metricLabel: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
    },
    metricValue: {
        fontSize: 36,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primary,
        marginTop: theme.spacing.sm,
    },
    metricValueOrange: {
        fontSize: 36,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.secondary,
        marginTop: theme.spacing.sm,
    },
    gpsCard: {
        backgroundColor: '#fff',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    gpsText: {
        marginLeft: theme.spacing.md,
        flex: 1,
    },
    gpsTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    gpsSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    endButton: {
        backgroundColor: theme.colors.error,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.md,
    },
    endButtonText: {
        color: '#fff',
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        marginLeft: theme.spacing.md,
    },
});
