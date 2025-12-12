import axios from 'axios';
import {
    Weather,
    WeatherResponse,
    parseWeather,
} from '../models/Weather';
import {
    WeatherForecast,
    ForecastResponse,
    parseWeatherForecast,
} from '../models/WeatherForecast';
import {
    HourlyWeather,
    HourlyWeatherResponse,
    parseHourlyWeather,
} from '../models/HourlyWeather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Weather Service
 * Handles all API calls to OpenWeatherMap API
 */
class WeatherService {
    /**
     * Get current weather data for a city
     * @param cityName - Name of the city
     * @returns Promise<Weather>
     */
    async getCurrentWeather(cityName: string): Promise<Weather> {
        try {
            const response = await axios.get<WeatherResponse>(
                `${BASE_URL}/weather`,
                {
                    params: {
                        q: cityName,
                        appid: API_KEY,
                        units: 'metric',
                        lang: 'de',
                    },
                }
            );

            return parseWeather(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Failed to load weather data: ${error.response?.status || error.message}`
                );
            }
            throw new Error(`Error fetching weather data: ${error}`);
        }
    }

    /**
     * Get 7-day weather forecast for a city
     * @param cityName - Name of the city
     * @returns Promise<WeatherForecast[]>
     */
    async getWeatherForecast(cityName: string): Promise<WeatherForecast[]> {
        try {
            const response = await axios.get<ForecastResponse>(
                `${BASE_URL}/forecast`,
                {
                    params: {
                        q: cityName,
                        appid: API_KEY,
                        units: 'metric',
                        lang: 'de',
                    },
                }
            );

            return parseWeatherForecast(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Failed to load forecast data: ${error.response?.status || error.message}`
                );
            }
            throw new Error(`Error fetching forecast data: ${error}`);
        }
    }

    /**
     * Get hourly weather forecast for a specific date
     * @param cityName - Name of the city
     * @param date - Target date for hourly forecast
     * @returns Promise<HourlyWeather[]>
     */
    async getHourlyWeather(
        cityName: string,
        date: Date
    ): Promise<HourlyWeather[]> {
        try {
            const response = await axios.get<HourlyWeatherResponse>(
                `${BASE_URL}/forecast`,
                {
                    params: {
                        q: cityName,
                        appid: API_KEY,
                        units: 'metric',
                        lang: 'de',
                    },
                }
            );

            return parseHourlyWeather(response.data, date);
        } catch (error) {
            console.error('getHourlyWeather error:', error);
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Failed to load hourly weather: ${error.response?.status || error.message}`
                );
            }
            throw new Error(`Error fetching hourly weather: ${error}`);
        }
    }
}

export default new WeatherService();
