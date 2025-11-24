import React from 'react';
import { IonCard, IonCardContent, IonIcon, IonText } from '@ionic/react';
import { waterOutline } from 'ionicons/icons';
import {
    HourlyWeather,
    getHourlyIconUrl,
    formatHour,
    isCurrentHour,
} from '../models/HourlyWeather';
import './HourlyWeatherComponent.css';

interface HourlyWeatherProps {
    hourlyData: HourlyWeather[];
    selectedDate: Date;
}

const HourlyWeatherComponent: React.FC<HourlyWeatherProps> = ({
    hourlyData,
    selectedDate,
}) => {
    const formatDate = (date: Date): string => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateOnly = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );

        if (dateOnly.getTime() === today.getTime()) {
            return 'Heute';
        } else if (dateOnly.getTime() === tomorrow.getTime()) {
            return 'Morgen';
        } else {
            const weekdays = [
                'Sonntag',
                'Montag',
                'Dienstag',
                'Mittwoch',
                'Donnerstag',
                'Freitag',
                'Samstag',
            ];
            return `${weekdays[date.getDay()]}, ${date.getDate()}.${date.getMonth() + 1
                }`;
        }
    };

    if (hourlyData.length === 0) {
        return (
            <IonCard>
                <IonCardContent className="empty-hourly">
                    <IonText color="medium">
                        <p>Keine stündlichen Daten für diesen Tag verfügbar</p>
                    </IonText>
                </IonCardContent>
            </IonCard>
        );
    }

    return (
        <div className="hourly-container">
            <div className="hourly-header">
                <IonIcon icon={waterOutline} color="primary" />
                <IonText>
                    <h3 className="hourly-title">
                        Stündliche Vorhersage - {formatDate(selectedDate)}
                    </h3>
                </IonText>
            </div>

            <div className="hourly-scroll">
                {hourlyData.map((hourly, index) => {
                    const isCurrent = isCurrentHour(hourly.dateTime);
                    return (
                        <IonCard
                            key={index}
                            className={`hourly-card ${isCurrent ? 'current' : ''}`}
                        >
                            <IonCardContent className="hourly-card-content">
                                <IonText>
                                    <p className="hourly-time">{formatHour(hourly.dateTime)}</p>
                                </IonText>

                                <img
                                    src={getHourlyIconUrl(hourly.icon)}
                                    alt={hourly.description}
                                    className="hourly-icon"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            '/assets/default-weather.png';
                                    }}
                                />

                                <IonText>
                                    <p className="hourly-temp">
                                        {Math.round(hourly.temperature)}°
                                    </p>
                                </IonText>

                                {hourly.pop > 0 && (
                                    <div className="hourly-precipitation">
                                        <IonIcon icon={waterOutline} className="precip-icon" />
                                        <IonText>
                                            <p className="precip-text">{Math.round(hourly.pop)}%</p>
                                        </IonText>
                                    </div>
                                )}
                            </IonCardContent>
                        </IonCard>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyWeatherComponent;
