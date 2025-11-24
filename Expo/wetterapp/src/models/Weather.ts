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

export interface WeatherApiResponse {
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

export const parseWeather = (json: WeatherApiResponse): Weather => {
    return {
        cityName: json.name.replace('ß', 'ss'),
        temperature: json.main.temp,
        description: json.weather[0].description.replace('ß', 'ss'),
        icon: json.weather[0].icon,
        humidity: json.main.humidity,
        windSpeed: json.wind.speed,
        pressure: json.main.pressure,
        timestamp: new Date(),
    };
};
