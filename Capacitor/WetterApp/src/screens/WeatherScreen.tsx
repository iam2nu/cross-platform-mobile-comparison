import React, { useEffect } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonCard,
    IonCardContent,
    IonText,
    IonIcon,
    IonButton,
    RefresherEventDetail,
} from '@ionic/react';
import { refreshOutline, closeCircleOutline } from 'ionicons/icons';
import { useWeatherStore } from '../store/weatherStore';
import CurrentWeather from '../components/CurrentWeather';
import WeatherForecastComponent from '../components/WeatherForecastComponent';
import HourlyWeatherComponent from '../components/HourlyWeatherComponent';
import SearchBar from '../components/SearchBar';
import './WeatherScreen.css';

const WeatherScreen: React.FC = () => {
    const {
        currentWeather,
        forecast,
        hourlyWeather,
        isLoading,
        isLoadingHourly,
        error,
        selectedDate,
        fetchWeatherData,
        refreshWeatherData,
        selectDate,
        clearError,
    } = useWeatherStore();

    useEffect(() => {
        // Lade initiale Wetterdaten für Dietikon
        const initializeData = async () => {
            await fetchWeatherData('Dietikon');
            // Lade automatisch stündliche Daten für heute
            selectDate(new Date());
        };
        initializeData();
    }, []);

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await refreshWeatherData();
        event.detail.complete();
    };

    const handleSearch = (cityName: string) => {
        fetchWeatherData(cityName);
    };

    const handleDaySelected = (date: Date) => {
        selectDate(date);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Wetter App</IonTitle>
                    <IonButton
                        slot="end"
                        fill="clear"
                        onClick={refreshWeatherData}
                        disabled={isLoading}
                    >
                        <IonIcon icon={refreshOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="weather-content">
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                <div className="content-wrapper">
                    {/* Search Section */}
                    <SearchBar onSearch={handleSearch} />

                    {/* Error Display */}
                    {error && (
                        <IonCard className="error-card">
                            <IonCardContent>
                                <div className="error-content">
                                    <IonIcon icon={closeCircleOutline} color="danger" />
                                    <IonText color="danger">
                                        <p>{error}</p>
                                    </IonText>
                                    <IonButton fill="clear" size="small" onClick={clearError}>
                                        <IonIcon icon={closeCircleOutline} />
                                    </IonButton>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    )}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <IonCard className="loading-card">
                            <IonCardContent>
                                <div className="loading-content">
                                    <IonSpinner name="crescent" />
                                    <IonText>
                                        <p>Wetterdaten werden geladen...</p>
                                    </IonText>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    )}

                    {/* Current Weather */}
                    {!isLoading && currentWeather && (
                        <CurrentWeather weather={currentWeather} />
                    )}

                    {/* 7-Day Forecast */}
                    {!isLoading && forecast.length > 0 && (
                        <WeatherForecastComponent
                            forecasts={forecast}
                            selectedDate={selectedDate}
                            onDaySelected={handleDaySelected}
                        />
                    )}

                    {/* Hourly Weather */}
                    {selectedDate && !isLoadingHourly && (
                        <HourlyWeatherComponent
                            hourlyData={hourlyWeather}
                            selectedDate={selectedDate}
                        />
                    )}

                    {/* Loading Hourly Data */}
                    {isLoadingHourly && (
                        <IonCard>
                            <IonCardContent>
                                <div className="loading-content">
                                    <IonSpinner name="crescent" />
                                </div>
                            </IonCardContent>
                        </IonCard>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default WeatherScreen;
