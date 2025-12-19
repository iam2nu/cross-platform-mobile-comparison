import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fahrzeug, Wartungseintrag } from '../models';
import database from '../database/database';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

type Props = NativeStackScreenProps<RootStackParamList, 'FahrzeugDetail'>;

export default function FahrzeugDetailScreen({ route, navigation }: Props) {
    const { fahrzeugId } = route.params;
    const [fahrzeug, setFahrzeug] = useState<Fahrzeug | null>(null);
    const [wartungen, setWartungen] = useState<Wartungseintrag[]>([]);
    const [totalKosten, setTotalKosten] = useState(0);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadData();

        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });

        return unsubscribe;
    }, [fahrzeugId, navigation]);

    useEffect(() => {
        if (fahrzeug) {
            navigation.setOptions({ title: fahrzeug.name });
        }
    }, [fahrzeug, navigation]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [fahrzeugData, wartungenData, kosten] = await Promise.all([
                database.getFahrzeugById(fahrzeugId),
                database.getWartungenForFahrzeug(fahrzeugId),
                database.getTotalKostenForFahrzeug(fahrzeugId),
            ]);

            setFahrzeug(fahrzeugData);
            setWartungen(wartungenData);
            setTotalKosten(kosten);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('de-CH', {
            style: 'currency',
            currency: 'CHF',
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd.MM.yyyy', { locale: de });
    };

    const renderWartungItem = ({ item }: { item: Wartungseintrag }) => (
        <View style={styles.wartungCard}>
            <View style={styles.wartungHeader}>
                <View style={styles.iconContainer}>
                    <Ionicons name="build" size={24} color={theme.colors.onPrimaryContainer} />
                </View>
                <View style={styles.wartungContent}>
                    <Text style={styles.wartungTitle}>{item.beschreibung}</Text>
                    <Text style={styles.wartungDate}>Datum: {formatDate(item.datum)}</Text>
                    <Text style={styles.wartungKm}>
                        Kilometerstand: {item.kilometerstand.toLocaleString('de-DE')} km
                    </Text>
                </View>
                <Text style={styles.wartungKosten}>{formatCurrency(item.kosten)}</Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!fahrzeug) {
        return (
            <View style={styles.centerContainer}>
                <Text>Fahrzeug nicht gefunden</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Schnellzugriff-Buttons */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={[styles.actionButton, { flex: 1, marginRight: 8 }]}
                        onPress={() => navigation.navigate('FahrtenList', { fahrzeugId })}
                    >
                        <Ionicons name="navigate" size={24} color="#fff" />
                        <Text style={styles.actionButtonText}>Fahrten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, { flex: 1, marginLeft: 8 }]}
                        onPress={() => navigation.navigate('AddWartung', { fahrzeugId })}
                    >
                        <Ionicons name="build" size={24} color="#fff" />
                        <Text style={styles.actionButtonText}>Wartung</Text>
                    </TouchableOpacity>
                </View>

                {/* Gesamtkosten */}
                <View style={styles.totalKostenCard}>
                    <Text style={styles.totalKostenLabel}>Gesamtkosten</Text>
                    <Text style={styles.totalKostenValue}>{formatCurrency(totalKosten)}</Text>
                </View>

                {/* Wartungsliste */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Wartungseinträge</Text>
                    {wartungen.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="construct-outline" size={48} color={theme.colors.disabled} />
                            <Text style={styles.emptyText}>
                                Keine Wartungseinträge vorhanden.{'\n'}Fügen Sie einen Eintrag hinzu!
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={wartungen}
                            renderItem={renderWartungItem}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                        />
                    )}
                </View>
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>

            {/* Action Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('FahrtenList', { fahrzeugId });
                            }}
                        >
                            <Ionicons name="navigate" size={24} color={theme.colors.primary} />
                            <View style={styles.modalItemText}>
                                <Text style={styles.modalItemTitle}>Neue Fahrt starten</Text>
                                <Text style={styles.modalItemSubtitle}>GPS-Tracking aktivieren</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.modalDivider} />

                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('AddWartung', { fahrzeugId });
                            }}
                        >
                            <Ionicons name="build" size={24} color={theme.colors.secondary} />
                            <View style={styles.modalItemText}>
                                <Text style={styles.modalItemTitle}>Neue Wartung hinzufügen</Text>
                                <Text style={styles.modalItemSubtitle}>Kosten und Details erfassen</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    quickActions: {
        flexDirection: 'row',
        padding: theme.spacing.md,
    },
    actionButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        marginLeft: theme.spacing.sm,
    },
    totalKostenCard: {
        backgroundColor: theme.colors.primaryContainer,
        margin: theme.spacing.md,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
    },
    totalKostenLabel: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
    },
    totalKostenValue: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.sm,
    },
    section: {
        padding: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    emptyText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
    wartungCard: {
        backgroundColor: '#fff',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    wartungHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primaryContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wartungContent: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    wartungTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    wartungDate: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    wartungKm: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    wartungKosten: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    fab: {
        position: 'absolute',
        right: theme.spacing.md,
        bottom: theme.spacing.md,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    modalItemText: {
        marginLeft: theme.spacing.md,
        flex: 1,
    },
    modalItemTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    modalItemSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    modalDivider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.sm,
    },
});
