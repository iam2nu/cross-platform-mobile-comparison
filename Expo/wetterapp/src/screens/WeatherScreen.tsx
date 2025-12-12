import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useWeatherStore } from '../store';
import {
    CurrentWeatherWidget,
    WeatherForecastWidget,
    HourlyWeatherWidget,
    SearchBar,
    PopularCities,
} from '../components';
import { theme } from '../theme';

const POPULAR_CITIES = [
    'Dietikon',
    'Zürich',
    'Winterthur',
    'Schlieren',
    'Neuenhof',
    'Baden',
    'Urdorf',
    'Bassersdorf',
];

export const WeatherScreen: React.FC = () => {
    const {
        currentWeather,
        forecast,
        hourlyWeather,
        isLoading,
        isLoadingHourly,
        error,
        selectedDate,
        fetchWeatherData,
        refreshWeatherData,
        clearError,
        selectDate,
    } = useWeatherStore();

    useEffect(() => {
        // Load initial weather data for Dietikon
        const initializeWeather = async () => {
            await fetchWeatherData('Dietikon');
            // Automatically load hourly data for today
            selectDate(new Date());
        };

        initializeWeather();
    }, []);

    const handleSearch = (cityName: string) => {
        fetchWeatherData(cityName);
    };

    const handleRefresh = async () => {
        await refreshWeatherData();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Wetter App</Text>
                <TouchableOpacity onPress={handleRefresh} activeOpacity={0.7}>
                    <Feather name="refresh-cw" size={24} color={theme.colors.white} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={handleRefresh}
                        tintColor={theme.colors.primary}
                        colors={[theme.colors.primary]}
                    />
                }
            >
                {/* Search Bar */}
                <SearchBar onSearch={handleSearch} />

                {/* Error Display */}
                {error && (
                    <View style={styles.errorContainer}>
                        <Feather name="alert-circle" size={20} color={theme.colors.errorDark} />
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={clearError}>
                            <Feather name="x" size={20} color={theme.colors.errorDark} />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Loading Indicator */}
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={styles.loadingText}>Wetterdaten werden geladen...</Text>
                    </View>
                )}

                {/* Current Weather */}
                {!isLoading && currentWeather && (
                    <View style={[styles.section, styles.weatherSection]}>
                        <CurrentWeatherWidget weather={currentWeather} />
                    </View>
                )}

                {/* 7-Day Forecast */}
                {!isLoading && forecast.length > 0 && (
                    <View style={styles.section}>
                        <WeatherForecastWidget
                            forecasts={forecast}
                            selectedDate={selectedDate}
                            onDaySelected={selectDate}
                        />
                    </View>
                )}

                {/* Hourly Weather */}
                {selectedDate && !isLoadingHourly && hourlyWeather.length > 0 && (
                    <View style={styles.section}>
                        <HourlyWeatherWidget
                            hourlyData={hourlyWeather}
                            cityName={currentWeather?.cityName || ''}
                            selectedDate={selectedDate}
                        />
                    </View>
                )}

                {/* Hourly Loading */}
                {isLoadingHourly && (
                    <View style={styles.hourlyLoadingContainer}>
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                    </View>
                )}

                {/* Popular Cities */}
                {!isLoading && (
                    <View style={styles.section}>
                        <PopularCities cities={POPULAR_CITIES} onCitySelect={handleSearch} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingTop: 50,
        paddingBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: theme.fontSize.xxxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    weatherSection: {
        marginTop: theme.spacing.md,
    },
    errorContainer: {
        backgroundColor: theme.colors.errorLight,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.md,
        gap: theme.spacing.md,
    },
    errorText: {
        flex: 1,
        color: theme.colors.errorDark,
        fontSize: theme.fontSize.md,
    },
    loadingContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.xl,
        alignItems: 'center',
        marginVertical: theme.spacing.md,
        ...theme.shadows.small,
    },
    loadingText: {
        marginTop: theme.spacing.md,
        fontSize: theme.fontSize.lg,
        color: theme.colors.text,
    },
    hourlyLoadingContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        alignItems: 'center',
        marginVertical: theme.spacing.md,
        ...theme.shadows.small,
    },
});
