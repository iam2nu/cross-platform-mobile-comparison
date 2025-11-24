import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonIcon,
    IonText,
    IonRow,
    IonCol,
} from '@ionic/react';
import {
    waterOutline,
    speedometerOutline,
    airplaneOutline,
} from 'ionicons/icons';
import { Weather, getWeatherIconUrl } from '../models/Weather';
import './CurrentWeather.css';

interface CurrentWeatherProps {
    weather: Weather;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
    return (
        <IonCard className="current-weather-card">
            <IonCardContent>
                <div className="weather-header">
                    <IonText color="light">
                        <h2 className="city-name">{weather.cityName}</h2>
                    </IonText>
                </div>

                <div className="weather-main">
                    <img
                        src={getWeatherIconUrl(weather.icon)}
                        alt={weather.description}
                        className="weather-icon"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/default-weather.png';
                        }}
                    />
                    <div className="temperature-section">
                        <IonText color="light">
                            <h1 className="temperature">{Math.round(weather.temperature)}°C</h1>
                            <p className="description">{weather.description}</p>
                        </IonText>
                    </div>
                </div>

                <IonRow className="weather-details">
                    <IonCol size="4">
                        <div className="detail-item">
                            <IonIcon icon={waterOutline} className="detail-icon" />
                            <IonText color="light">
                                <p className="detail-label">Luftfeuchtigkeit</p>
                                <p className="detail-value">{Math.round(weather.humidity)}%</p>
                            </IonText>
                        </div>
                    </IonCol>
                    <IonCol size="4">
                        <div className="detail-item">
                            <IonIcon icon={airplaneOutline} className="detail-icon" />
                            <IonText color="light">
                                <p className="detail-label">Wind</p>
                                <p className="detail-value">{weather.windSpeed.toFixed(1)} m/s</p>
                            </IonText>
                        </div>
                    </IonCol>
                    <IonCol size="4">
                        <div className="detail-item">
                            <IonIcon icon={speedometerOutline} className="detail-icon" />
                            <IonText color="light">
                                <p className="detail-label">Druck</p>
                                <p className="detail-value">{Math.round(weather.pressure)} hPa</p>
                            </IonText>
                        </div>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard>
    );
};

export default CurrentWeather;
