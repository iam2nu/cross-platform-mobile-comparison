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
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

type Props = NativeStackScreenProps<RootStackParamList, 'AddWartung'>;

export default function AddWartungScreen({ route, navigation }: Props) {
    const { fahrzeugId } = route.params;
    const [datum, setDatum] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [kilometerstand, setKilometerstand] = useState('');
    const [kosten, setKosten] = useState('');
    const [beschreibung, setBeschreibung] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!kilometerstand.trim()) {
            newErrors.kilometerstand = 'Bitte geben Sie den Kilometerstand ein';
        } else if (isNaN(Number(kilometerstand))) {
            newErrors.kilometerstand = 'Bitte geben Sie eine gültige Zahl ein';
        }

        if (!kosten.trim()) {
            newErrors.kosten = 'Bitte geben Sie die Kosten ein';
        } else {
            const normalizedKosten = kosten.replace(',', '.');
            if (isNaN(Number(normalizedKosten))) {
                newErrors.kosten = 'Bitte geben Sie eine gültige Zahl ein';
            }
        }

        if (!beschreibung.trim()) {
            newErrors.beschreibung = 'Bitte geben Sie eine Beschreibung ein';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        try {
            const normalizedKosten = kosten.replace(',', '.');

            await database.insertWartung({
                fahrzeugId,
                datum: datum.toISOString(),
                kilometerstand: Number(kilometerstand),
                kosten: Number(normalizedKosten),
                beschreibung: beschreibung.trim(),
            });

            navigation.goBack();
        } catch (error) {
            console.error('Error saving wartung:', error);
            Alert.alert('Fehler', 'Wartung konnte nicht gespeichert werden');
        }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDatum(selectedDate);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.form}>
                    {/* Datum */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Datum *</Text>
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dateText}>{format(datum, 'dd.MM.yyyy')}</Text>
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={datum}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}

                    {/* Kilometerstand */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Kilometerstand *</Text>
                        <View style={styles.inputWithSuffix}>
                            <TextInput
                                style={[
                                    styles.input,
                                    styles.inputWithSuffixText,
                                    errors.kilometerstand && styles.inputError,
                                ]}
                                value={kilometerstand}
                                onChangeText={setKilometerstand}
                                placeholder="z.B. 50000"
                                placeholderTextColor={theme.colors.textSecondary}
                                keyboardType="numeric"
                            />
                            <Text style={styles.suffix}>km</Text>
                        </View>
                        {errors.kilometerstand && (
                            <Text style={styles.errorText}>{errors.kilometerstand}</Text>
                        )}
                    </View>

                    {/* Kosten */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Kosten *</Text>
                        <View style={styles.inputWithSuffix}>
                            <TextInput
                                style={[
                                    styles.input,
                                    styles.inputWithSuffixText,
                                    errors.kosten && styles.inputError,
                                ]}
                                value={kosten}
                                onChangeText={setKosten}
                                placeholder="z.B. 123.45"
                                placeholderTextColor={theme.colors.textSecondary}
                                keyboardType="decimal-pad"
                            />
                            <Text style={styles.suffix}>€</Text>
                        </View>
                        {errors.kosten && <Text style={styles.errorText}>{errors.kosten}</Text>}
                    </View>

                    {/* Beschreibung */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Beschreibung *</Text>
                        <TextInput
                            style={[
                                styles.input,
                                styles.textArea,
                                errors.beschreibung && styles.inputError,
                            ]}
                            value={beschreibung}
                            onChangeText={setBeschreibung}
                            placeholder="z.B. Ölwechsel"
                            placeholderTextColor={theme.colors.textSecondary}
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                        />
                        {errors.beschreibung && (
                            <Text style={styles.errorText}>{errors.beschreibung}</Text>
                        )}
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
    inputWithSuffix: {
        position: 'relative',
    },
    inputWithSuffixText: {
        paddingRight: 50,
    },
    suffix: {
        position: 'absolute',
        right: theme.spacing.md,
        top: theme.spacing.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    dateButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
    },
    dateText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
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
