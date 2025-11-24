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
import { Fahrzeug } from '../models';
import database from '../database/database';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const [fahrzeuge, setFahrzeuge] = useState<Fahrzeug[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFahrzeuge();

        // Refresh when screen comes into focus
        const unsubscribe = navigation.addListener('focus', () => {
            loadFahrzeuge();
        });

        return unsubscribe;
    }, [navigation]);

    const loadFahrzeuge = async () => {
        setLoading(true);
        try {
            const data = await database.getAllFahrzeuge();
            setFahrzeuge(data);
        } catch (error) {
            console.error('Error loading fahrzeuge:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: Fahrzeug }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('FahrzeugDetail', { fahrzeugId: item.id })}
        >
            <View style={styles.cardContent}>
                <Ionicons name="car" size={32} color={theme.colors.primary} />
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    {(item.marke || item.modell) && (
                        <Text style={styles.cardSubtitle}>
                            {[item.marke, item.modell].filter(Boolean).join(' ')}
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
            {fahrzeuge.length === 0 ? (
                <View style={styles.centerContainer}>
                    <Ionicons name="car-outline" size={64} color={theme.colors.disabled} />
                    <Text style={styles.emptyText}>
                        Keine Fahrzeuge vorhanden.{'\n'}Fügen Sie ein Fahrzeug hinzu!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={fahrzeuge}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddFahrzeug')}
            >
                <Ionicons name="add" size={32} color="#fff" />
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
        padding: theme.spacing.lg,
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
    cardText: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    cardTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    cardSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
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
});
