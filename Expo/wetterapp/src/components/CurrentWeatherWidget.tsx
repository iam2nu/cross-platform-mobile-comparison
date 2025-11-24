import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Weather, getIconUrl, getTemperatureCelsius } from '../models';
import { theme } from '../theme';

interface CurrentWeatherWidgetProps {
    weather: Weather;
}

export const CurrentWeatherWidget: React.FC<CurrentWeatherWidgetProps> = ({ weather }) => {
    return (
        <LinearGradient
            colors={[theme.colors.blueGradientStart, theme.colors.blueGradientEnd]}
            style={styles.container}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <Text style={styles.cityName}>{weather.cityName}</Text>

            <View style={styles.mainWeatherContainer}>
                <Image
                    source={{ uri: getIconUrl(weather.icon) }}
                    style={styles.weatherIcon}
                    resizeMode="contain"
                />

                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                        {getTemperatureCelsius(weather.temperature)}°C
                    </Text>
                    <Text style={styles.description}>{weather.description}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <WeatherDetail
                    icon="droplet"
                    label="Luftfeuchtigkeit"
                    value={`${Math.round(weather.humidity)}%`}
                />
                <WeatherDetail
                    icon="wind"
                    label="Wind"
                    value={`${weather.windSpeed.toFixed(1)} m/s`}
                />
                <WeatherDetail
                    icon="activity"
                    label="Druck"
                    value={`${Math.round(weather.pressure)} hPa`}
                />
            </View>
        </LinearGradient>
    );
};

interface WeatherDetailProps {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    value: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon, label, value }) => {
    return (
        <View style={styles.detailItem}>
            <Feather name={icon} size={24} color={theme.colors.white} />
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.medium,
    },
    cityName: {
        fontSize: theme.fontSize.xxxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    mainWeatherContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: theme.spacing.md,
    },
    weatherIcon: {
        width: 80,
        height: 80,
    },
    temperatureContainer: {
        marginLeft: theme.spacing.lg,
        alignItems: 'flex-start',
    },
    temperature: {
        fontSize: theme.fontSize.huge,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
    },
    description: {
        fontSize: theme.fontSize.lg,
        color: theme.colors.white,
        textTransform: 'capitalize',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: theme.spacing.lg,
    },
    detailItem: {
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.white70,
        marginTop: theme.spacing.xs,
    },
    detailValue: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
        marginTop: theme.spacing.xs / 2,
    },
});
