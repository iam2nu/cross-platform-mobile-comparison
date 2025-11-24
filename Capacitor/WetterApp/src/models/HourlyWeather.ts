export interface HourlyWeather {
    dateTime: Date;
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    pop: number; // Probability of precipitation (0-100)
}

export interface HourlyWeatherItem {
    dt: number;
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
    };
    pop: number;
}

export interface HourlyWeatherResponse {
    list: HourlyWeatherItem[];
}

export const parseHourlyWeather = (
    data: HourlyWeatherResponse,
    targetDate: Date
): HourlyWeather[] => {
    const hourlyForecasts: HourlyWeather[] = [];

    data.list.forEach((item) => {
        try {
            const itemDateTime = new Date(item.dt * 1000);

            // Prüfe ob es der gleiche Tag ist
            if (
                itemDateTime.getFullYear() === targetDate.getFullYear() &&
                itemDateTime.getMonth() === targetDate.getMonth() &&
                itemDateTime.getDate() === targetDate.getDate()
            ) {
                hourlyForecasts.push({
                    dateTime: itemDateTime,
                    temperature: item.main.temp,
                    description: item.weather[0].description.replace(/ß/g, 'ss'),
                    icon: item.weather[0].icon,
                    humidity: item.main.humidity,
                    windSpeed: item.wind?.speed || 0,
                    pop: item.pop * 100,
                });
            }
        } catch (e) {
            console.error('Error parsing hourly item:', e);
        }
    });

    // Sortiere nach Zeit
    return hourlyForecasts.sort(
        (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
    );
};

export const getHourlyIconUrl = (icon: string): string => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const formatHour = (date: Date): string => {
    return `${date.getHours().toString().padStart(2, '0')}:00`;
};

export const isCurrentHour = (date: Date): boolean => {
    const now = new Date();
    return (
        date.getHours() === now.getHours() &&
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    );
};
