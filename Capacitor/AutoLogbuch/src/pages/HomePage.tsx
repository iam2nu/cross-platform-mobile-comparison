import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    useIonViewWillEnter,
} from '@ionic/react';
import { add, car } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Fahrzeug } from '../models';
import { getAllFahrzeuge } from '../services/database.service';

const HomePage: React.FC = () => {
    const [fahrzeuge, setFahrzeuge] = useState<Fahrzeug[]>([]);
    const history = useHistory();

    const loadFahrzeuge = async () => {
        const data = await getAllFahrzeuge();
        setFahrzeuge(data);
    };

    useIonViewWillEnter(() => {
        loadFahrzeuge();
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Meine Fahrzeuge</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {fahrzeuge.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <IonIcon icon={car} style={{ fontSize: '64px', color: '#ccc' }} />
                        <p style={{ color: '#888', marginTop: '16px' }}>
                            Noch keine Fahrzeuge hinzugefügt
                        </p>
                    </div>
                ) : (
                    <IonList>
                        {fahrzeuge.map((fahrzeug) => (
                            <IonItem
                                key={fahrzeug.id}
                                button
                                detail={true}
                                onClick={() => history.push(`/fahrzeug/${fahrzeug.id}`)}
                            >
                                <IonIcon slot="start" icon={car} />
                                <IonLabel>
                                    <h2>{fahrzeug.name}</h2>
                                    {(fahrzeug.marke || fahrzeug.modell) && (
                                        <p>{fahrzeug.marke || ''} {fahrzeug.modell || ''}</p>
                                    )}
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton color="primary" onClick={() => history.push('/add-fahrzeug')}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
