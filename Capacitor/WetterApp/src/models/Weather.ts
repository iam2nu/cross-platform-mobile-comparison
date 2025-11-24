export interface Weather {
    cityName: string;
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    timestamp: Date;
}

export interface WeatherResponse {
    name: string;
    main: {
        temp: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
    };
}

export const parseWeather = (data: WeatherResponse): Weather => {
    return {
        cityName: data.name.replace(/ß/g, 'ss'),
        temperature: data.main.temp,
        description: data.weather[0].description.replace(/ß/g, 'ss'),
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        timestamp: new Date(),
    };
};

export const getWeatherIconUrl = (icon: string): string => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
