import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fahrt } from '../models';
import database from '../database/database';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

type Props = NativeStackScreenProps<RootStackParamList, 'FahrtenList'>;

export default function FahrtenListScreen({ route, navigation }: Props) {
    const { fahrzeugId } = route.params;
    const [fahrten, setFahrten] = useState<Fahrt[]>([]);
    const [activeFahrt, setActiveFahrt] = useState<Fahrt | null>(null);
    const [totalDistanz, setTotalDistanz] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();

        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });

        return unsubscribe;
    }, [fahrzeugId, navigation]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [fahrtenData, activeFahrtData, distanz] = await Promise.all([
                database.getFahrtenForFahrzeug(fahrzeugId),
                database.getActiveFahrt(fahrzeugId),
                database.getTotalDistanzForFahrzeug(fahrzeugId),
            ]);

            setFahrten(fahrtenData);
            setActiveFahrt(activeFahrtData);
            setTotalDistanz(distanz);
        } catch (error) {
            console.error('Error loading fahrten:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd.MM.yyyy HH:mm', { locale: de });
    };

    const formatDauer = (startZeit: string, endZeit?: string) => {
        if (!endZeit) return '';
        const start = new Date(startZeit);
        const end = new Date(endZeit);
        const durationMs = end.getTime() - start.getTime();
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}min`;
    };

    const abgeschlosseneFahrten = fahrten.filter((f) => f.istAbgeschlossen);

    const renderFahrtItem = ({ item }: { item: Fahrt }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('FahrtDetail', { fahrtId: item.id })}
        >
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <Ionicons name="navigate" size={24} color={theme.colors.onPrimaryContainer} />
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{formatDate(item.startZeit)}</Text>
                    <Text style={styles.cardInfo}>
                        Distanz: {item.distanzKm.toFixed(1)} km
                    </Text>
                    {item.endZeit && (
                        <Text style={styles.cardInfo}>
                            Dauer: {formatDauer(item.startZeit, item.endZeit)}
                        </Text>
                    )}
                    {item.startAdresse && (
                        <Text style={styles.cardAddress} numberOfLines={1}>
                            Von: {item.startAdresse}
                        </Text>
                    )}
                </View>
                <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Gesamtdistanz */}
            <View style={styles.totalDistanzCard}>
                <Text style={styles.totalDistanzLabel}>Gesamtdistanz</Text>
                <Text style={styles.totalDistanzValue}>{totalDistanz.toFixed(1)} km</Text>
            </View>

            {/* Aktive Fahrt Warnung */}
            {activeFahrt && (
                <TouchableOpacity
                    style={styles.activeFahrtCard}
                    onPress={() => navigation.navigate('ActiveFahrt', { fahrzeugId })}
                >
                    <Ionicons name="car" size={24} color={theme.colors.secondary} />
                    <View style={styles.activeFahrtText}>
                        <Text style={styles.activeFahrtTitle}>Aktive Fahrt läuft</Text>
                        <Text style={styles.activeFahrtSubtitle}>
                            Gestartet: {formatDate(activeFahrt.startZeit)}
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={theme.colors.textSecondary}
                    />
                </TouchableOpacity>
            )}

            {/* Fahrten Liste */}
            {abgeschlosseneFahrten.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="navigate-outline" size={64} color={theme.colors.disabled} />
                    <Text style={styles.emptyText}>
                        Keine abgeschlossenen Fahrten.{'\n'}Starten Sie eine neue Fahrt!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={abgeschlosseneFahrten}
                    renderItem={renderFahrtItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            {/* FAB */}
            <TouchableOpacity
                style={[
                    styles.fab,
                    activeFahrt && { backgroundColor: theme.colors.error },
                ]}
                onPress={() => navigation.navigate('ActiveFahrt', { fahrzeugId })}
            >
                <Ionicons name={activeFahrt ? 'stop' : 'play'} size={24} color="#fff" />
                <Text style={styles.fabText}>
                    {activeFahrt ? 'Fahrt beenden' : 'Fahrt starten'}
                </Text>
            </TouchableOpacity>
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
    totalDistanzCard: {
        backgroundColor: theme.colors.secondaryContainer,
        margin: theme.spacing.md,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
    },
    totalDistanzLabel: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
    },
    totalDistanzValue: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.sm,
    },
    activeFahrtCard: {
        backgroundColor: '#FFF3E0',
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeFahrtText: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    activeFahrtTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    activeFahrtSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    listContainer: {
        padding: theme.spacing.md,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.md,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    cardTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    cardInfo: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    cardAddress: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    emptyText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
    fab: {
        position: 'absolute',
        right: theme.spacing.md,
        bottom: theme.spacing.md,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        color: '#fff',
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        marginLeft: theme.spacing.sm,
    },
});
