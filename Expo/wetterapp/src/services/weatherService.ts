import {
    Weather,
    WeatherApiResponse,
    parseWeather,
    WeatherForecast,
    WeatherForecastApiItem,
    parseWeatherForecast,
    HourlyWeather,
    HourlyWeatherApiItem,
    parseHourlyWeather,
} from '../models';

const API_KEY = '263ea31dffaabd18f22500019c36e755';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherService {
    /**
     * Fetches current weather data for a given city
     * @param cityName The name of the city
     * @returns Promise with Weather data
     */
    static async getCurrentWeather(cityName: string): Promise<Weather> {
        try {
            const url = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=de`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to load weather data: ${response.status}`);
            }

            const jsonData: WeatherApiResponse = await response.json();
            return parseWeather(jsonData);
        } catch (e) {
            console.error('Error fetching weather data:', e);
            throw new Error(`Error fetching weather data: ${e}`);
        }
    }

    /**
     * Fetches 7-day weather forecast for a given city
     * @param cityName The name of the city
     * @returns Promise with array of WeatherForecast data
     */
    static async getWeatherForecast(cityName: string): Promise<WeatherForecast[]> {
        try {
            const url = `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=de`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to load forecast data: ${response.status}`);
            }

            const jsonData = await response.json();
            const forecastList: WeatherForecastApiItem[] = jsonData.list;

            // Group forecasts by day and take only one per day (prefer noon forecasts)
            const dailyForecasts = new Map<string, WeatherForecast>();

            forecastList.forEach((item) => {
                const forecast = parseWeatherForecast(item);
                const dateKey = forecast.dateTime.toISOString().substring(0, 10);

                // Take only the noon forecast (12:00) or the first of the day
                if (
                    !dailyForecasts.has(dateKey) ||
                    forecast.dateTime.getHours() === 12
                ) {
                    dailyForecasts.set(dateKey, forecast);
                }
            });

            // Sort by date and take maximum 7 days
            const sortedForecasts = Array.from(dailyForecasts.values()).sort(
                (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
            );

            return sortedForecasts.slice(0, 7);
        } catch (e) {
            console.error('Error fetching forecast data:', e);
            throw new Error(`Error fetching forecast data: ${e}`);
        }
    }

    /**
     * Fetches hourly weather data for a specific date
     * @param cityName The name of the city
     * @param date The date to fetch hourly data for
     * @returns Promise with array of HourlyWeather data
     */
    static async getHourlyWeather(
        cityName: string,
        date: Date
    ): Promise<HourlyWeather[]> {
        try {
            const url = `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=de`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to load hourly weather: ${response.status}`);
            }

            const jsonData = await response.json();
            const forecastList: HourlyWeatherApiItem[] = jsonData.list;

            // Filter only hours for the selected day
            const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const hourlyForecasts: HourlyWeather[] = [];

            forecastList.forEach((item) => {
                try {
                    const hourly = parseHourlyWeather(item);
                    const itemDate = new Date(
                        hourly.dateTime.getFullYear(),
                        hourly.dateTime.getMonth(),
                        hourly.dateTime.getDate()
                    );

                    // Check if it's the same day
                    if (
                        itemDate.getFullYear() === targetDate.getFullYear() &&
                        itemDate.getMonth() === targetDate.getMonth() &&
                        itemDate.getDate() === targetDate.getDate()
                    ) {
                        hourlyForecasts.push(hourly);
                    }
                } catch (e) {
                    console.error('Error parsing hourly item:', e);
                    // Skip this item and continue with next
                }
            });

            // Sort by time
            hourlyForecasts.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

            return hourlyForecasts;
        } catch (e) {
            console.error('getHourlyWeather error:', e);
            throw new Error(`Error fetching hourly weather: ${e}`);
        }
    }
}
