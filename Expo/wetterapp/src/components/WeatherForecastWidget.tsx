import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {
    WeatherForecast,
    getIconUrl,
    getMaxTempCelsius,
    getMinTempCelsius,
    getDayOfWeek,
} from '../models';
import { theme } from '../theme';

interface WeatherForecastWidgetProps {
    forecasts: WeatherForecast[];
    selectedDate: Date | null;
    onDaySelected?: (date: Date) => void;
}

export const WeatherForecastWidget: React.FC<WeatherForecastWidgetProps> = ({
    forecasts,
    selectedDate,
    onDaySelected,
}) => {
    const isSameDay = (date1: Date, date2: Date): boolean => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const isToday = (date: Date): boolean => {
        return isSameDay(date, new Date());
    };

    const renderForecastCard = ({ item }: { item: WeatherForecast }) => {
        const isSelected = selectedDate !== null && isSameDay(item.dateTime, selectedDate);

        return (
            <TouchableOpacity
                onPress={() => onDaySelected?.(item.dateTime)}
                style={[
                    styles.forecastCard,
                    isSelected && styles.forecastCardSelected,
                ]}
                activeOpacity={0.7}
            >
                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                    {isToday(item.dateTime) ? 'Heute' : getDayOfWeek(item.dateTime)}
                </Text>

                <Image
                    source={{ uri: getIconUrl(item.icon) }}
                    style={styles.forecastIcon}
                    resizeMode="contain"
                />

                <View style={styles.temperatureRange}>
                    <Text style={styles.maxTemp}>{getMaxTempCelsius(item.maxTemp)}°</Text>
                    <Text style={styles.minTemp}>{getMinTempCelsius(item.minTemp)}°</Text>
                </View>

                <Text style={styles.forecastDescription} numberOfLines={2}>
                    {item.description}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>7-Tage Vorhersage</Text>
                <Text style={styles.headerSubtitle}>(Tippen für Stunden)</Text>
            </View>

            <FlatList
                data={forecasts}
                renderItem={renderForecastCard}
                keyExtractor={(item, index) => `${item.date}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                bounces
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: theme.spacing.sm,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    headerTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginRight: theme.spacing.sm,
    },
    headerSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
    },
    listContainer: {
        paddingHorizontal: theme.spacing.sm,
    },
    forecastCard: {
        width: 120,
        backgroundColor: theme.colors.selectedBlue,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.xs,
        marginHorizontal: theme.spacing.sm,
        marginVertical: theme.spacing.xs,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        ...theme.shadows.small,
    },
    forecastCardSelected: {
        backgroundColor: theme.colors.selectedBlue,
        borderColor: theme.colors.primary,
        ...theme.shadows.medium,
    },
    dayText: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
        textAlign: 'center',
    },
    dayTextSelected: {
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primaryDark,
    },
    forecastIcon: {
        width: 40,
        height: 40,
        marginVertical: theme.spacing.xs,
    },
    temperatureRange: {
        alignItems: 'center',
    },
    maxTemp: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    minTemp: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },
    forecastDescription: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
        textTransform: 'capitalize',
    },
});
