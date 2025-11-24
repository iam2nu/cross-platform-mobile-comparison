export interface WeatherForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
    description: string;
    icon: string;
    humidity: number;
    dateTime: Date;
}

export interface ForecastItem {
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

export interface ForecastResponse {
    list: ForecastItem[];
}

export const parseWeatherForecast = (data: ForecastResponse): WeatherForecast[] => {
    // Gruppiere die Vorhersagen nach Tagen und nimm nur eine pro Tag
    const dailyForecasts = new Map<string, WeatherForecast>();

    data.list.forEach((item) => {
        const dateTime = new Date(item.dt * 1000);
        const dateKey = dateTime.toISOString().substring(0, 10);

        // Nimm nur die Mittags-Vorhersage (12:00) oder die erste des Tages
        if (!dailyForecasts.has(dateKey) || dateTime.getHours() === 12) {
            dailyForecasts.set(dateKey, {
                date: item.dt_txt,
                maxTemp: item.main.temp_max,
                minTemp: item.main.temp_min,
                description: item.weather[0].description.replace(/ß/g, 'ss'),
                icon: item.weather[0].icon,
                humidity: item.main.humidity,
                dateTime: dateTime,
            });
        }
    });

    // Sortiere nach Datum und nimm maximal 7 Tage
    return Array.from(dailyForecasts.values())
        .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
        .slice(0, 7);
};

export const getForecastIconUrl = (icon: string): string => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const getDayOfWeek = (date: Date): string => {
    const weekdays = [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
    ];
    return weekdays[date.getDay()];
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
};
