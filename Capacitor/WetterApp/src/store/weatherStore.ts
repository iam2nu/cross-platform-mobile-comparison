import { create } from 'zustand';
import { Weather } from '../models/Weather';
import { WeatherForecast } from '../models/WeatherForecast';
import { HourlyWeather } from '../models/HourlyWeather';
import weatherService from '../services/weatherService';

interface WeatherState {
    // State
    currentWeather: Weather | null;
    forecast: WeatherForecast[];
    hourlyWeather: HourlyWeather[];
    isLoading: boolean;
    isLoadingHourly: boolean;
    error: string | null;
    currentCity: string;
    selectedDate: Date | null;

    // Actions
    fetchWeatherData: (cityName: string) => Promise<void>;
    refreshWeatherData: () => Promise<void>;
    fetchHourlyWeather: (date: Date) => Promise<void>;
    selectDate: (date: Date) => void;
    clearError: () => void;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
    // Initial state
    currentWeather: null,
    forecast: [],
    hourlyWeather: [],
    isLoading: false,
    isLoadingHourly: false,
    error: null,
    currentCity: 'Dietikon',
    selectedDate: null,

    // Actions
    fetchWeatherData: async (cityName: string) => {
        set({ isLoading: true, error: null, currentCity: cityName });

        try {
            // Führe beide API-Calls parallel aus für bessere Performance
            const [currentWeather, forecast] = await Promise.all([
                weatherService.getCurrentWeather(cityName),
                weatherService.getWeatherForecast(cityName),
            ]);

            set({
                currentWeather,
                forecast,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: `Fehler beim Laden der Wetterdaten: ${error}`,
                currentWeather: null,
                forecast: [],
                isLoading: false,
            });
        }
    },

    refreshWeatherData: async () => {
        const { currentCity, fetchWeatherData } = get();
        await fetchWeatherData(currentCity);
    },

    fetchHourlyWeather: async (date: Date) => {
        const { currentCity } = get();
        set({ isLoadingHourly: true, selectedDate: date, error: null });

        try {
            const hourlyData = await weatherService.getHourlyWeather(
                currentCity,
                date
            );

            set({
                hourlyWeather: hourlyData,
                isLoadingHourly: false,
            });
        } catch (error) {
            console.error('Error loading hourly weather:', error);
            set({
                error: `Fehler beim Laden der stündlichen Wetterdaten: ${error}`,
                hourlyWeather: [],
                isLoadingHourly: false,
            });
        }
    },

    selectDate: (date: Date) => {
        get().fetchHourlyWeather(date);
    },

    clearError: () => {
        set({ error: null });
    },
}));
