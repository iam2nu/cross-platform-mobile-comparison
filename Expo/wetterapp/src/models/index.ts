export * from './Weather';
export * from './WeatherForecast';
export * from './HourlyWeather';

// Shared utility functions
export const getIconUrl = (icon: string): string => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const getTemperatureCelsius = (temp: number): number => {
    return Math.round(temp);
};
