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
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonTextarea,
    IonButton,
    IonIcon,
    useIonToast,
} from '@ionic/react';
import { save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fahrt } from '../models';
import { getFahrtById, updateFahrt } from '../services/database.service';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const FahrtDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [fahrt, setFahrt] = useState<Fahrt | null>(null);
    const [notizen, setNotizen] = useState('');
    const [present] = useIonToast();

    const loadFahrt = async () => {
        const f = await getFahrtById(parseInt(id));
        if (f) {
            setFahrt(f);
            setNotizen(f.notizen);
        }
    };

    useEffect(() => {
        loadFahrt();
    }, [id]);

    const handleSave = async () => {
        if (fahrt) {
            await updateFahrt(fahrt.id, { notizen });
            present({
                message: 'Notizen gespeichert',
                duration: 2000,
                color: 'success'
            });
            setFahrt({ ...fahrt, notizen });
        }
    };

    if (!fahrt) {
        return <IonPage><IonContent><p>Lädt...</p></IonContent></IonPage>;
    }

    const dauer = fahrt.endZeit
        ? Math.floor((new Date(fahrt.endZeit).getTime() - new Date(fahrt.startZeit).getTime()) / 1000)
        : 0;

    const hours = Math.floor(dauer / 3600);
    const minutes = Math.floor((dauer % 3600) / 60);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Fahrtdetails</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Fahrtinformationen</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            <IonItem lines="none">
                                <IonLabel>Datum</IonLabel>
                                <IonNote slot="end">
                                    {format(new Date(fahrt.startZeit), 'dd. MMMM yyyy', { locale: de })}
                                </IonNote>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Startzeit</IonLabel>
                                <IonNote slot="end">
                                    {format(new Date(fahrt.startZeit), 'HH:mm', { locale: de })} Uhr
                                </IonNote>
                            </IonItem>
                            {fahrt.endZeit && (
                                <IonItem lines="none">
                                    <IonLabel>Endzeit</IonLabel>
                                    <IonNote slot="end">
                                        {format(new Date(fahrt.endZeit), 'HH:mm', { locale: de })} Uhr
                                    </IonNote>
                                </IonItem>
                            )}
                            <IonItem lines="none">
                                <IonLabel>Distanz</IonLabel>
                                <IonNote slot="end" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    {fahrt.distanzKm.toFixed(2)} km
                                </IonNote>
                            </IonItem>
                            {dauer > 0 && (
                                <IonItem lines="none">
                                    <IonLabel>Dauer</IonLabel>
                                    <IonNote slot="end">
                                        {hours > 0 ? `${hours} Std. ${minutes} Min.` : `${minutes} Min.`}
                                    </IonNote>
                                </IonItem>
                            )}
                        </IonList>
                    </IonCardContent>
                </IonCard>

                {(fahrt.startAdresse || fahrt.endAdresse) && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Adressen</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                                {fahrt.startAdresse && (
                                    <IonItem lines="none">
                                        <IonLabel>
                                            <h3>Start</h3>
                                            <p>{fahrt.startAdresse}</p>
                                        </IonLabel>
                                    </IonItem>
                                )}
                                {fahrt.endAdresse && (
                                    <IonItem lines="none">
                                        <IonLabel>
                                            <h3>Ziel</h3>
                                            <p>{fahrt.endAdresse}</p>
                                        </IonLabel>
                                    </IonItem>
                                )}
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                )}

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>GPS-Koordinaten</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            <IonItem lines="none">
                                <IonLabel>
                                    <h3>Start</h3>
                                    <p>Lat: {fahrt.startLatitude.toFixed(6)}, Lng: {fahrt.startLongitude.toFixed(6)}</p>
                                </IonLabel>
                            </IonItem>
                            {fahrt.endLatitude && fahrt.endLongitude && (
                                <IonItem lines="none">
                                    <IonLabel>
                                        <h3>Ziel</h3>
                                        <p>Lat: {fahrt.endLatitude.toFixed(6)}, Lng: {fahrt.endLongitude.toFixed(6)}</p>
                                    </IonLabel>
                                </IonItem>
                            )}
                        </IonList>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Notizen</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonTextarea
                            value={notizen}
                            onIonInput={(e) => setNotizen(e.detail.value!)}
                            placeholder="Notizen zur Fahrt..."
                            rows={6}
                        />
                        <IonButton expand="block" onClick={handleSave} style={{ marginTop: '16px' }}>
                            <IonIcon slot="start" icon={save} />
                            Speichern
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default FahrtDetailPage;
