import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fahrt } from '../models';
import database from '../database/database';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

type Props = NativeStackScreenProps<RootStackParamList, 'FahrtDetail'>;

export default function FahrtDetailScreen({ route, navigation }: Props) {
    const { fahrtId } = route.params;
    const [fahrt, setFahrt] = useState<Fahrt | null>(null);
    const [notizen, setNotizen] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFahrt();
    }, [fahrtId]);

    const loadFahrt = async () => {
        try {
            const fahrtData = await database.getFahrtById(fahrtId);
            if (fahrtData) {
                setFahrt(fahrtData);
                setNotizen(fahrtData.notizen || '');
            }
        } catch (error) {
            console.error('Error loading fahrt:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNotizen = async () => {
        try {
            await database.updateFahrt(fahrtId, { notizen });
            Alert.alert('Erfolg', 'Notizen gespeichert');
        } catch (error) {
            console.error('Error saving notizen:', error);
            Alert.alert('Fehler', 'Notizen konnten nicht gespeichert werden');
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd.MM.yyyy HH:mm', { locale: de });
    };

    const formatDauer = () => {
        if (!fahrt || !fahrt.endZeit) return '';
        const start = new Date(fahrt.startZeit);
        const end = new Date(fahrt.endZeit);
        const durationMs = end.getTime() - start.getTime();
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}min`;
    };

    const InfoRow = ({
        icon,
        label,
        value,
    }: {
        icon: string;
        label: string;
        value: string;
    }) => (
        <View style={styles.infoRow}>
            <Ionicons name={icon as any} size={20} color={theme.colors.textSecondary} />
            <Text style={styles.infoLabel}>{label}: </Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!fahrt) {
        return (
            <View style={styles.centerContainer}>
                <Text>Fahrt nicht gefunden</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            {/* Distanz Card */}
            <View style={styles.distanzCard}>
                <Ionicons name="navigate" size={48} color={theme.colors.primary} />
                <Text style={styles.distanzLabel}>Distanz</Text>
                <Text style={styles.distanzValue}>{fahrt.distanzKm.toFixed(2)} km</Text>
            </View>

            {/* Zeit Informationen */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Zeit</Text>
                <View style={styles.divider} />
                <InfoRow icon="play-outline" label="Start" value={formatDate(fahrt.startZeit)} />
                {fahrt.endZeit && (
                    <>
                        <View style={styles.spacer} />
                        <InfoRow icon="stop-outline" label="Ende" value={formatDate(fahrt.endZeit)} />
                        <View style={styles.spacer} />
                        <InfoRow icon="time-outline" label="Dauer" value={formatDauer()} />
                    </>
                )}
            </View>

            {/* GPS Koordinaten */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>GPS-Koordinaten</Text>
                <View style={styles.divider} />
                <InfoRow
                    icon="location-outline"
                    label="Start"
                    value={`${fahrt.startLatitude.toFixed(6)}, ${fahrt.startLongitude.toFixed(6)}`}
                />
                {fahrt.endLatitude && fahrt.endLongitude && (
                    <>
                        <View style={styles.spacer} />
                        <InfoRow
                            icon="location-outline"
                            label="Ende"
                            value={`${fahrt.endLatitude.toFixed(6)}, ${fahrt.endLongitude.toFixed(6)}`}
                        />
                    </>
                )}
            </View>

            {/* Adressen */}
            {(fahrt.startAdresse || fahrt.endAdresse) && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Adressen</Text>
                    <View style={styles.divider} />
                    {fahrt.startAdresse && (
                        <InfoRow icon="location" label="Von" value={fahrt.startAdresse} />
                    )}
                    {fahrt.endAdresse && (
                        <>
                            <View style={styles.spacer} />
                            <InfoRow icon="location" label="Nach" value={fahrt.endAdresse} />
                        </>
                    )}
                </View>
            )}

            {/* Notizen */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Notizen</Text>
                <View style={styles.divider} />
                <TextInput
                    style={styles.notizenInput}
                    value={notizen}
                    onChangeText={setNotizen}
                    placeholder="Notizen zur Fahrt..."
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveNotizen}>
                    <Ionicons name="save-outline" size={20} color="#fff" />
                    <Text style={styles.saveButtonText}>Speichern</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    distanzCard: {
        backgroundColor: theme.colors.primaryContainer,
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    distanzLabel: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        marginTop: theme.spacing.sm,
    },
    distanzValue: {
        fontSize: 32,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.xs,
    },
    card: {
        backgroundColor: '#fff',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.md,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
    },
    infoValue: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        flex: 1,
    },
    spacer: {
        height: theme.spacing.sm,
    },
    notizenInput: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        minHeight: 100,
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.md,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        marginLeft: theme.spacing.sm,
    },
});
