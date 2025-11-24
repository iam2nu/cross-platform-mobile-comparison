import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import database from '../database/database';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AddFahrzeug'>;

export default function AddFahrzeugScreen({ navigation }: Props) {
    const [name, setName] = useState('');
    const [marke, setMarke] = useState('');
    const [modell, setModell] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Bitte geben Sie einen Namen ein';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        try {
            await database.insertFahrzeug({
                name: name.trim(),
                marke: marke.trim() || undefined,
                modell: modell.trim() || undefined,
            });

            navigation.goBack();
        } catch (error) {
            console.error('Error saving fahrzeug:', error);
            Alert.alert('Fehler', 'Fahrzeug konnte nicht gespeichert werden');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name *</Text>
                        <TextInput
                            style={[styles.input, errors.name && styles.inputError]}
                            value={name}
                            onChangeText={setName}
                            placeholder="z.B. Mein Golf"
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Marke (optional)</Text>
                        <TextInput
                            style={styles.input}
                            value={marke}
                            onChangeText={setMarke}
                            placeholder="z.B. VW"
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Modell (optional)</Text>
                        <TextInput
                            style={styles.input}
                            value={modell}
                            onChangeText={setModell}
                            placeholder="z.B. Golf VII"
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Speichern</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        flexGrow: 1,
    },
    form: {
        padding: theme.spacing.md,
    },
    inputContainer: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    errorText: {
        color: theme.colors.error,
        fontSize: theme.fontSize.sm,
        marginTop: theme.spacing.xs,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginTop: theme.spacing.lg,
    },
    buttonText: {
        color: '#fff',
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
    },
});
