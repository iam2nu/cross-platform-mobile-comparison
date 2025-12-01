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
    IonButton,
    IonIcon,
} from '@ionic/react';
import { add, navigate } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Fahrt } from '../models';
import { getFahrtenByFahrzeug, getActiveFahrtForFahrzeug } from '../services/database.service';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const FahrtenListPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [fahrten, setFahrten] = useState<Fahrt[]>([]);
    const [hasActiveFahrt, setHasActiveFahrt] = useState(false);
    const history = useHistory();

    const loadFahrten = async () => {
        const data = await getFahrtenByFahrzeug(parseInt(id));
        setFahrten(data);
        const activeFahrt = await getActiveFahrtForFahrzeug(parseInt(id));
        setHasActiveFahrt(!!activeFahrt);
    };

    useEffect(() => {
        loadFahrten();
    }, [id]);

    const totalDistanz = fahrten.reduce((sum, f) => sum + f.distanzKm, 0);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Fahrten</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Gesamtstrecke</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                            {totalDistanz.toFixed(2)} km
                        </div>
                    </IonCardContent>
                </IonCard>

                {!hasActiveFahrt && (
                    <div style={{ padding: '16px' }}>
                        <IonButton
                            expand="block"
                            color="success"
                            onClick={() => history.push(`/fahrzeug/${id}/active-fahrt`)}
                        >
                            <IonIcon slot="start" icon={add} />
                            Neue Fahrt starten
                        </IonButton>
                    </div>
                )}

                {hasActiveFahrt && (
                    <div style={{ padding: '16px' }}>
                        <IonButton
                            expand="block"
                            color="warning"
                            onClick={() => history.push(`/fahrzeug/${id}/active-fahrt`)}
                        >
                            <IonIcon slot="start" icon={navigate} />
                            Aktive Fahrt fortsetzen
                        </IonButton>
                    </div>
                )}

                {fahrten.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <IonIcon icon={navigate} style={{ fontSize: '64px', color: '#ccc' }} />
                        <p style={{ color: '#888', marginTop: '16px' }}>
                            Noch keine Fahrten vorhanden
                        </p>
                    </div>
                ) : (
                    <IonList>
                        {fahrten.map((fahrt) => (
                            <IonItem
                                key={fahrt.id}
                                button
                                onClick={() => history.push(`/fahrt/${fahrt.id}`)}
                            >
                                <IonLabel>
                                    <h3>{format(new Date(fahrt.startZeit), 'dd. MMMM yyyy', { locale: de })}</h3>
                                    <p>{format(new Date(fahrt.startZeit), 'HH:mm', { locale: de })} Uhr</p>
                                    {fahrt.notizen && <p>{fahrt.notizen}</p>}
                                </IonLabel>
                                <IonNote slot="end">
                                    <div style={{ textAlign: 'right' }}>
                                        <div>{fahrt.distanzKm.toFixed(2)} km</div>
                                        {fahrt.endZeit && (
                                            <div style={{ fontSize: '0.8em', color: '#888' }}>
                                                {format(new Date(fahrt.endZeit), 'HH:mm', { locale: de })} Uhr
                                            </div>
                                        )}
                                    </div>
                                </IonNote>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default FahrtenListPage;
