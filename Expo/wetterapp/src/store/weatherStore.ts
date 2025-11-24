import { create } from 'zustand';
import { Weather, WeatherForecast, HourlyWeather } from '../models';
import { WeatherService } from '../services';

interface WeatherState {
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
    clearError: () => void;
    fetchHourlyWeather: (date: Date) => Promise<void>;
    selectDate: (date: Date) => void;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
    currentWeather: null,
    forecast: [],
    hourlyWeather: [],
    isLoading: false,
    isLoadingHourly: false,
    error: null,
    currentCity: 'Dietikon',
    selectedDate: null,

    fetchWeatherData: async (cityName: string) => {
        set({ isLoading: true, error: null, currentCity: cityName });

        try {
            // Execute both API calls in parallel for better performance
            const [currentWeather, forecast] = await Promise.all([
                WeatherService.getCurrentWeather(cityName),
                WeatherService.getWeatherForecast(cityName),
            ]);

            set({
                currentWeather,
                forecast,
                isLoading: false,
            });
        } catch (e) {
            set({
                error: `Fehler beim Laden der Wetterdaten: ${e}`,
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

    clearError: () => {
        set({ error: null });
    },

    fetchHourlyWeather: async (date: Date) => {
        set({ isLoadingHourly: true, selectedDate: date, error: null });

        try {
            const { currentCity } = get();
            const hourlyData = await WeatherService.getHourlyWeather(currentCity, date);

            if (hourlyData.length === 0) {
                // No data available, but not an error
                set({ hourlyWeather: [], isLoadingHourly: false });
            } else {
                set({ hourlyWeather: hourlyData, isLoadingHourly: false });
            }
        } catch (e) {
            console.error('Error loading hourly weather:', e);
            set({
                error: `Fehler beim Laden der stündlichen Wetterdaten: ${e}`,
                hourlyWeather: [],
                isLoadingHourly: false,
            });
        }
    },

    selectDate: (date: Date) => {
        const { fetchHourlyWeather } = get();
        fetchHourlyWeather(date);
    },
}));
