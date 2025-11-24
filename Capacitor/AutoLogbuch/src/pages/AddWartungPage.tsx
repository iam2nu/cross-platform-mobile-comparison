import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    useIonToast,
    IonDatetime,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { insertWartung } from '../services/database.service';

const AddWartungPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [beschreibung, setBeschreibung] = useState('');
    const [kosten, setKosten] = useState('');
    const [datum, setDatum] = useState(new Date().toISOString());
    const [kilometerstand, setKilometerstand] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [present] = useIonToast();
    const history = useHistory();

    useEffect(() => {
        // Flutter: KM ist unabhängig vom Fahrzeug und wird manuell eingegeben
        // Daher hier keine Vorbelegung mehr.
    }, [id]);

    const handleSubmit = async () => {
        if (!beschreibung || !kosten || !datum || !kilometerstand) {
            present({
                message: 'Bitte alle Felder ausfüllen',
                duration: 2000,
                color: 'warning'
            });
            return;
        }

        const kostenNum = parseFloat(kosten);
        const kmNum = parseFloat(kilometerstand);

        if (isNaN(kostenNum) || kostenNum < 0) {
            present({
                message: 'Bitte gültige Kosten eingeben',
                duration: 2000,
                color: 'danger'
            });
            return;
        }

        if (isNaN(kmNum) || kmNum < 0) {
            present({
                message: 'Bitte gültigen Kilometerstand eingeben',
                duration: 2000,
                color: 'danger'
            });
            return;
        }

        await insertWartung({
            fahrzeugId: parseInt(id),
            datum,
            kilometerstand: kmNum,
            kosten: kostenNum,
            beschreibung
        });

        present({
            message: 'Wartung hinzugefügt',
            duration: 2000,
            color: 'success'
        });

        history.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Wartung hinzufügen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem button onClick={() => setShowDatePicker(!showDatePicker)}>
                        <IonLabel position="stacked">Datum *</IonLabel>
                        <IonLabel>{new Date(datum).toLocaleDateString('de-DE')}</IonLabel>
                    </IonItem>

                    {showDatePicker && (
                        <IonItem>
                            <IonDatetime
                                value={datum}
                                onIonChange={(e) => setDatum(e.detail.value as string)}
                                presentation="date"
                            />
                        </IonItem>
                    )}

                    <IonItem>
                        <IonLabel position="stacked">Kilometerstand *</IonLabel>
                        <IonInput
                            type="number"
                            value={kilometerstand}
                            onIonInput={(e) => setKilometerstand(e.detail.value!)}
                            placeholder="0"
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Kosten (CHF) *</IonLabel>
                        <IonInput
                            type="number"
                            value={kosten}
                            onIonInput={(e) => setKosten(e.detail.value!)}
                            placeholder="0.00"
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Beschreibung *</IonLabel>
                        <IonTextarea
                            value={beschreibung}
                            onIonInput={(e) => setBeschreibung(e.detail.value!)}
                            placeholder="Details zur Wartung"
                            rows={3}
                        />
                    </IonItem>
                </IonList>

                <div style={{ padding: '16px' }}>
                    <IonButton expand="block" onClick={handleSubmit}>
                        Wartung hinzufügen
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AddWartungPage;
