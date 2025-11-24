import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
    HourlyWeather,
    getIconUrl,
    getTemperatureCelsius,
    getHourString,
    getPrecipitationPercent,
} from '../models';
import { theme } from '../theme';

interface HourlyWeatherWidgetProps {
    hourlyData: HourlyWeather[];
    cityName: string;
    selectedDate: Date;
}

export const HourlyWeatherWidget: React.FC<HourlyWeatherWidgetProps> = ({
    hourlyData,
    cityName,
    selectedDate,
}) => {
    const formatDate = (date: Date): string => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (dateOnly.getTime() === today.getTime()) {
            return 'Heute';
        } else if (dateOnly.getTime() === tomorrow.getTime()) {
            return 'Morgen';
        } else {
            const weekdays = [
                'Sonntag',
                'Montag',
                'Dienstag',
                'Mittwoch',
                'Donnerstag',
                'Freitag',
                'Samstag',
            ];
            return `${weekdays[date.getDay()]}, ${date.getDate()}.${date.getMonth() + 1}`;
        }
    };

    if (hourlyData.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    Keine stündlichen Daten für diesen Tag verfügbar
                </Text>
            </View>
        );
    }

    const renderHourlyCard = ({ item, index }: { item: HourlyWeather; index: number }) => {
        const now = new Date();
        const isCurrentHour =
            item.dateTime.getHours() === now.getHours() &&
            item.dateTime.getDate() === now.getDate() &&
            item.dateTime.getMonth() === now.getMonth();

        return (
            <View
                style={[
                    styles.hourlyCard,
                    isCurrentHour && styles.hourlyCardCurrent,
                ]}
            >
                <Text style={[styles.hourText, isCurrentHour && styles.textCurrent]}>
                    {getHourString(item.dateTime)}
                </Text>

                <Image
                    source={{ uri: getIconUrl(item.icon) }}
                    style={styles.hourlyIcon}
                    resizeMode="contain"
                />

                <Text style={[styles.hourlyTemp, isCurrentHour && styles.textCurrent]}>
                    {getTemperatureCelsius(item.temperature)}°
                </Text>

                {getPrecipitationPercent(item.pop) > 0 && (
                    <View style={styles.precipitationContainer}>
                        <Feather
                            name="droplet"
                            size={12}
                            color={isCurrentHour ? theme.colors.white70 : theme.colors.primary}
                        />
                        <Text style={[styles.precipitationText, isCurrentHour && styles.textCurrent70]}>
                            {getPrecipitationPercent(item.pop)}%
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Feather name="clock" size={20} color={theme.colors.primaryDark} />
                <Text style={styles.headerTitle}>
                    Stündliche Vorhersage - {formatDate(selectedDate)}
                </Text>
            </View>

            <FlatList
                data={hourlyData}
                renderItem={renderHourlyCard}
                keyExtractor={(item, index) => `${item.dateTime.getTime()}-${index}`}
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
        marginLeft: theme.spacing.sm,
    },
    listContainer: {
        paddingHorizontal: theme.spacing.sm,
    },
    hourlyCard: {
        width: 90,
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginHorizontal: theme.spacing.xs + 2,
        marginVertical: theme.spacing.xs,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        ...theme.shadows.small,
    },
    hourlyCardCurrent: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primaryDark,
        borderWidth: 2,
    },
    hourText: {
        fontSize: theme.fontSize.sm + 1,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    textCurrent: {
        color: theme.colors.white,
    },
    textCurrent70: {
        color: theme.colors.white70,
    },
    hourlyIcon: {
        width: 35,
        height: 35,
        marginVertical: theme.spacing.xs,
    },
    hourlyTemp: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginVertical: theme.spacing.xs / 2,
    },
    precipitationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing.xs / 2,
    },
    precipitationText: {
        fontSize: theme.fontSize.xs + 1,
        color: theme.colors.primary,
        marginLeft: 2,
    },
    emptyContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        margin: theme.spacing.md,
        alignItems: 'center',
        ...theme.shadows.small,
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSize.md,
    },
});
