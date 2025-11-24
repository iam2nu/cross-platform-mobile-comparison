import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface PopularCitiesProps {
    cities: string[];
    onCitySelect: (city: string) => void;
}

export const PopularCities: React.FC<PopularCitiesProps> = ({ cities, onCitySelect }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Beliebte Städte</Text>

            <View style={styles.citiesContainer}>
                {cities.map((city) => (
                    <TouchableOpacity
                        key={city}
                        style={styles.cityChip}
                        onPress={() => onCitySelect(city)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.cityText}>{city}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        ...theme.shadows.small,
    },
    title: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    citiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    cityChip: {
        backgroundColor: theme.colors.selectedBlue,
        borderWidth: 1,
        borderColor: theme.colors.primaryLight,
        borderRadius: theme.borderRadius.sm,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    cityText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
    },
});
