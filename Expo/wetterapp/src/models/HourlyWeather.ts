export interface HourlyWeather {
    dateTime: Date;
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    pop: number; // Probability of precipitation in percentage
}

export interface HourlyWeatherApiItem {
    dt: number;
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    wind?: {
        speed: number;
    };
    pop?: number;
}

export const parseHourlyWeather = (
    json: HourlyWeatherApiItem
): HourlyWeather => {
    try {
        const description = json.weather[0]?.description || '';

        return {
            dateTime: new Date(json.dt * 1000),
            temperature: json.main.temp,
            description: description.replace('ß', 'ss'),
            icon: json.weather[0]?.icon || '01d',
            humidity: json.main.humidity,
            windSpeed: json.wind?.speed || 0,
            pop: (json.pop || 0) * 100,
        };
    } catch (e) {
        console.error('Error in parseHourlyWeather:', e);
        throw e;
    }
};

export const getHourString = (date: Date): string => {
    return `${date.getHours().toString().padStart(2, '0')}:00`;
};

export const getPrecipitationPercent = (pop: number): number => {
    return Math.round(pop);
};
