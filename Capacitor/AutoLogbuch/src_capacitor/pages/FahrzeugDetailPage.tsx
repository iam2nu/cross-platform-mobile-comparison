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
    IonGrid,
    IonRow,
    IonCol,
    IonFab,
    IonFabButton,
    useIonActionSheet,
} from '@ionic/react';
import { add, build, navigate } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Fahrzeug, Wartung } from '../models';
import { getFahrzeugById, getWartungenByFahrzeug, getActiveFahrtForFahrzeug } from '../services/database.service';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const FahrzeugDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [fahrzeug, setFahrzeug] = useState<Fahrzeug | null>(null);
    const [wartungen, setWartungen] = useState<Wartung[]>([]);
    const [hasActiveFahrt, setHasActiveFahrt] = useState(false);
    const [presentActionSheet] = useIonActionSheet();
    const history = useHistory();

    const loadData = async () => {
        const f = await getFahrzeugById(parseInt(id));
        if (f) {
            setFahrzeug(f);
            const w = await getWartungenByFahrzeug(f.id);
            setWartungen(w);
            const activeFahrt = await getActiveFahrtForFahrzeug(f.id);
            setHasActiveFahrt(!!activeFahrt);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const handleFabClick = () => {
        presentActionSheet({
            header: 'Neue Aktion wählen',
            buttons: [
                {
                    text: 'Neue Fahrt starten',
                    handler: () => {
                        history.push(`/fahrzeug/${id}/active-fahrt`);
                    }
                },
                {
                    text: 'Neue Wartung hinzufügen',
                    handler: () => {
                        history.push(`/fahrzeug/${id}/add-wartung`);
                    }
                },
                {
                    text: 'Abbrechen',
                    role: 'cancel'
                }
            ]
        });
    };

    const totalKosten = wartungen.reduce((sum, w) => sum + w.kosten, 0);

    if (!fahrzeug) {
        return <IonPage><IonContent><p>Lädt...</p></IonContent></IonPage>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{fahrzeug.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/* Zusammenfassung Gesamtkosten im Stil der Flutter-Karte */}
                <div className="summary-container">
                    <div className="summary-title">Gesamtkosten</div>
                    <div className="summary-value">CHF {totalKosten.toFixed(2)}</div>
                </div>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Fahrzeuginfo</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            {fahrzeug.marke && (
                                <IonItem lines="none">
                                    <IonLabel>Marke</IonLabel>
                                    <IonNote slot="end">{fahrzeug.marke}</IonNote>
                                </IonItem>
                            )}
                            {fahrzeug.modell && (
                                <IonItem lines="none">
                                    <IonLabel>Modell</IonLabel>
                                    <IonNote slot="end">{fahrzeug.modell}</IonNote>
                                </IonItem>
                            )}
                            <IonItem lines="none">
                                <IonLabel>Gesamtkosten</IonLabel>
                                <IonNote slot="end">CHF {totalKosten.toFixed(2)}</IonNote>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Schnellaktionen</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonButton
                                        expand="block"
                                        onClick={() => history.push(`/fahrzeug/${id}/add-wartung`)}
                                    >
                                        <IonIcon slot="start" icon={build} />
                                        Wartung
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton
                                        expand="block"
                                        onClick={() => history.push(`/fahrzeug/${id}/fahrten`)}
                                    >
                                        <IonIcon slot="start" icon={navigate} />
                                        Fahrten
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                            {!hasActiveFahrt && (
                                <IonRow>
                                    <IonCol>
                                        <IonButton
                                            expand="block"
                                            color="success"
                                            onClick={() => history.push(`/fahrzeug/${id}/active-fahrt`)}
                                        >
                                            Fahrt starten
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            )}
                            {hasActiveFahrt && (
                                <IonRow>
                                    <IonCol>
                                        <IonButton
                                            expand="block"
                                            color="warning"
                                            onClick={() => history.push(`/fahrzeug/${id}/active-fahrt`)}
                                        >
                                            Aktive Fahrt fortsetzen
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            )}
                        </IonGrid>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Wartungshistorie</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {wartungen.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#888' }}>Keine Wartungen vorhanden</p>
                        ) : (
                            <IonList>
                                {wartungen.map((wartung) => (
                                    <IonItem key={wartung.id} lines="full">
                                        <IonIcon slot="start" icon={build} />
                                        <IonLabel>
                                            <h3 style={{ fontWeight: 600 }}>{wartung.beschreibung}</h3>
                                            <p>
                                                {format(new Date(wartung.datum), 'dd.MM.yyyy', { locale: de })}
                                            </p>
                                            <p>Kilometerstand: {wartung.kilometerstand.toLocaleString('de-DE')} km</p>
                                        </IonLabel>
                                        <IonNote slot="end" style={{ fontSize: '16px', fontWeight: 700 }}>
                                            CHF {wartung.kosten.toFixed(2)}
                                        </IonNote>
                                    </IonItem>
                                ))}
                            </IonList>
                        )}
                    </IonCardContent>
                </IonCard>

                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton onClick={handleFabClick}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default FahrzeugDetailPage;
