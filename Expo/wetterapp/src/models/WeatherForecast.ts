export interface WeatherForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
    description: string;
    icon: string;
    humidity: number;
    dateTime: Date;
}

export interface WeatherForecastApiItem {
    dt: number;
    dt_txt: string;
    main: {
        temp_max: number;
        temp_min: number;
        humidity: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
}

export const parseWeatherForecast = (
    json: WeatherForecastApiItem
): WeatherForecast => {
    return {
        date: json.dt_txt,
        maxTemp: json.main.temp_max,
        minTemp: json.main.temp_min,
        description: json.weather[0].description.replace('ß', 'ss'),
        icon: json.weather[0].icon,
        humidity: json.main.humidity,
        dateTime: new Date(json.dt * 1000),
    };
};

export const getMaxTempCelsius = (temp: number): number => {
    return Math.round(temp);
};

export const getMinTempCelsius = (temp: number): number => {
    return Math.round(temp);
};

export const getDayOfWeek = (date: Date): string => {
    const weekdays = [
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
        'Sonntag',
    ];
    return weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1];
};
