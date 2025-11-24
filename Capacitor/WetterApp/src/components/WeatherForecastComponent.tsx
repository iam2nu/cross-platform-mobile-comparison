import React, { useRef } from 'react';
import { IonCard, IonCardContent, IonText } from '@ionic/react';
import {
    WeatherForecast,
    getForecastIconUrl,
    getDayOfWeek,
    isSameDay,
    isToday,
} from '../models/WeatherForecast';
import './WeatherForecastComponent.css';

interface WeatherForecastProps {
    forecasts: WeatherForecast[];
    selectedDate: Date | null;
    onDaySelected: (date: Date) => void;
}

const WeatherForecastComponent: React.FC<WeatherForecastProps> = ({
    forecasts,
    selectedDate,
    onDaySelected,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleDayClick = (forecast: WeatherForecast) => {
        onDaySelected(forecast.dateTime);
    };

    return (
        <div className="forecast-container">
            <div className="forecast-header">
                <IonText>
                    <h3 className="forecast-title">7-Tage Vorhersage</h3>
                </IonText>
                <IonText color="medium">
                    <p className="forecast-subtitle">(Tippen für Stunden)</p>
                </IonText>
            </div>

            <div className="forecast-scroll" ref={scrollRef}>
                {forecasts.map((forecast, index) => {
                    const isSelected =
                        selectedDate && isSameDay(forecast.dateTime, selectedDate);

                    return (
                        <IonCard
                            key={index}
                            className={`forecast-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleDayClick(forecast)}
                            button
                        >
                            <IonCardContent className="forecast-card-content">
                                <IonText>
                                    <p className="forecast-day">
                                        {isToday(forecast.dateTime)
                                            ? 'Heute'
                                            : getDayOfWeek(forecast.dateTime)}
                                    </p>
                                </IonText>

                                <img
                                    src={getForecastIconUrl(forecast.icon)}
                                    alt={forecast.description}
                                    className="forecast-icon"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            '/assets/default-weather.png';
                                    }}
                                />

                                <div className="forecast-temps">
                                    <IonText>
                                        <p className="temp-max">{Math.round(forecast.maxTemp)}°</p>
                                    </IonText>
                                    <IonText color="medium">
                                        <p className="temp-min">{Math.round(forecast.minTemp)}°</p>
                                    </IonText>
                                </div>

                                <IonText color="medium">
                                    <p className="forecast-description">{forecast.description}</p>
                                </IonText>
                            </IonCardContent>
                        </IonCard>
                    );
                })}
            </div>
        </div>
    );
};

export default WeatherForecastComponent;
