import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    useIonToast,
    useIonAlert,
} from '@ionic/react';
import { stopCircle, locationOutline } from 'ionicons/icons';
import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Fahrt } from '../models';
import {
    startFahrt,
    endFahrt,
    getActiveFahrtForFahrzeug,
    updateFahrt,
} from '../services/database.service';
import locationService from '../services/location.service';
import { format } from 'date-fns';

interface SimplePosition {
    latitude: number;
    longitude: number;
    timestamp: number;
}

const ActiveFahrtPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [fahrt, setFahrt] = useState<Fahrt | null>(null);
    const [currentPosition, setCurrentPosition] = useState<SimplePosition | null>(null);
    const [distanzKm, setDistanzKm] = useState(0);
    const [dauer, setDauer] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const [present] = useIonToast();
    const [presentAlert] = useIonAlert();
    const history = useHistory();
    const lastPositionRef = useRef<SimplePosition | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const loadActiveFahrt = async () => {
        const activeFahrt = await getActiveFahrtForFahrzeug(parseInt(id));
        if (activeFahrt) {
            setFahrt(activeFahrt);
            setDistanzKm(activeFahrt.distanzKm);

            // Set last position from start coordinates
            lastPositionRef.current = {
                latitude: activeFahrt.startLatitude,
                longitude: activeFahrt.startLongitude,
                timestamp: new Date(activeFahrt.startZeit).getTime()
            };
            setCurrentPosition(lastPositionRef.current);

            startTimer(activeFahrt.startZeit);
            startTracking();
        }
    };

    const startTimer = (startTime: string) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            const start = new Date(startTime).getTime();
            const now = Date.now();
            const diff = Math.floor((now - start) / 1000);
            setDauer(diff);
        }, 1000);
    };

    const startTracking = async () => {
        const hasPermission = await locationService.requestPermissions();
        if (!hasPermission) {
            present({
                message: 'GPS-Berechtigung erforderlich',
                duration: 3000,
                color: 'danger'
            });
            return;
        }

        setIsTracking(true);

        await locationService.watchPosition((position: SimplePosition) => {
            setCurrentPosition(position);

            if (lastPositionRef.current) {
                const distance = locationService.calculateDistance(
                    lastPositionRef.current.latitude,
                    lastPositionRef.current.longitude,
                    position.latitude,
                    position.longitude
                );

                if (distance > 0.01) {
                    setDistanzKm((prev) => prev + distance);
                }
            }

            lastPositionRef.current = position;
        });
    };

    const handleStartFahrt = async () => {
        const hasPermission = await locationService.requestPermissions();
        if (!hasPermission) {
            present({
                message: 'GPS-Berechtigung erforderlich',
                duration: 3000,
                color: 'danger'
            });
            return;
        }

        const position = await locationService.getCurrentPosition();
        if (!position) {
            present({
                message: 'GPS-Position konnte nicht ermittelt werden',
                duration: 3000,
                color: 'danger'
            });
            return;
        }

        // Get start address
        const startAdresse = await locationService.reverseGeocode(position.latitude, position.longitude);

        const newFahrt = await startFahrt({
            fahrzeugId: parseInt(id),
            startZeit: new Date().toISOString(),
            startLatitude: position.latitude,
            startLongitude: position.longitude,
            distanzKm: 0,
            notizen: ''
        });

        // Update with start address if available
        if (startAdresse) {
            await updateFahrt(newFahrt.id, { startAdresse });
            newFahrt.startAdresse = startAdresse;
        }

        setFahrt(newFahrt);
        setDistanzKm(0);
        setCurrentPosition(position);
        lastPositionRef.current = position;
        startTimer(newFahrt.startZeit);
        startTracking();

        present({
            message: 'Fahrt gestartet',
            duration: 2000,
            color: 'success'
        });
    };

    const handleEndFahrt = () => {
        presentAlert({
            header: 'Fahrt beenden',
            message: `Möchten Sie die Fahrt beenden? (${distanzKm.toFixed(2)} km)`,
            buttons: [
                'Abbrechen',
                {
                    text: 'Beenden',
                    handler: async () => {
                        if (fahrt && currentPosition) {
                            // Get end address
                            const endAdresse = await locationService.reverseGeocode(
                                currentPosition.latitude,
                                currentPosition.longitude
                            );

                            await endFahrt(
                                fahrt.id,
                                currentPosition.latitude,
                                currentPosition.longitude,
                                distanzKm,
                                endAdresse
                            );

                            locationService.clearWatch();
                            if (timerRef.current) {
                                clearInterval(timerRef.current);
                            }

                            present({
                                message: 'Fahrt beendet',
                                duration: 2000,
                                color: 'success'
                            });

                            history.replace(`/fahrt/${fahrt.id}`);
                        }
                    }
                }
            ]
        });
    };

    useEffect(() => {
        loadActiveFahrt();

        return () => {
            locationService.clearWatch();
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [id]);

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{fahrt ? 'Aktive Fahrt' : 'Fahrt starten'}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {!fahrt && (
                    <div style={{ padding: '16px' }}>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Neue Fahrt</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>Starten Sie eine neue Fahrt mit GPS-Tracking.</p>
                                <IonButton expand="block" color="success" onClick={handleStartFahrt} style={{ marginTop: '16px' }}>
                                    Fahrt starten
                                </IonButton>
                            </IonCardContent>
                        </IonCard>
                    </div>
                )}

                {fahrt && (
                    <>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Fahrtdaten</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonList>
                                    <IonItem lines="none">
                                        <IonLabel>Distanz</IonLabel>
                                        <IonNote slot="end" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                            {distanzKm.toFixed(2)} km
                                        </IonNote>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonLabel>Dauer</IonLabel>
                                        <IonNote slot="end" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                            {formatDuration(dauer)}
                                        </IonNote>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonLabel>Gestartet</IonLabel>
                                        <IonNote slot="end">
                                            {format(new Date(fahrt.startZeit), 'HH:mm')} Uhr
                                        </IonNote>
                                    </IonItem>
                                </IonList>
                            </IonCardContent>
                        </IonCard>

                        {currentPosition && (
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        <IonIcon icon={locationOutline} /> Aktuelle Position
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonList>
                                        <IonItem lines="none">
                                            <IonLabel>Breitengrad</IonLabel>
                                            <IonNote slot="end">{currentPosition.latitude.toFixed(6)}</IonNote>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Längengrad</IonLabel>
                                            <IonNote slot="end">{currentPosition.longitude.toFixed(6)}</IonNote>
                                        </IonItem>
                                    </IonList>
                                    {isTracking && (
                                        <div style={{ marginTop: '8px', color: 'green', textAlign: 'center' }}>
                                            ● GPS-Tracking aktiv
                                        </div>
                                    )}
                                </IonCardContent>
                            </IonCard>
                        )}

                        <div style={{ padding: '16px' }}>
                            <IonButton expand="block" color="danger" onClick={handleEndFahrt}>
                                <IonIcon slot="start" icon={stopCircle} />
                                Fahrt beenden
                            </IonButton>
                        </div>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ActiveFahrtPage;
