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
    IonButton,
    useIonToast,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { insertFahrzeug } from '../services/database.service';

const AddFahrzeugPage: React.FC = () => {
    const [name, setName] = useState('');
    const [marke, setMarke] = useState('');
    const [modell, setModell] = useState('');
    const [present] = useIonToast();
    const history = useHistory();

    const handleSubmit = async () => {
        if (!name) {
            present({
                message: 'Bitte Name eingeben',
                duration: 2000,
                color: 'warning'
            });
            return;
        }

        await insertFahrzeug({
            name,
            marke: marke || undefined,
            modell: modell || undefined
        });

        present({
            message: 'Fahrzeug hinzugefügt',
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
                    <IonTitle>Fahrzeug hinzufügen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Name *</IonLabel>
                        <IonInput
                            value={name}
                            onIonInput={(e) => setName(e.detail.value!)}
                            placeholder="z.B. Mein Golf"
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Marke (optional)</IonLabel>
                        <IonInput
                            value={marke}
                            onIonInput={(e) => setMarke(e.detail.value!)}
                            placeholder="z.B. VW"
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Modell (optional)</IonLabel>
                        <IonInput
                            value={modell}
                            onIonInput={(e) => setModell(e.detail.value!)}
                            placeholder="z.B. Golf VII"
                        />
                    </IonItem>
                </IonList>

                <div style={{ padding: '16px' }}>
                    <IonButton expand="block" onClick={handleSubmit}>
                        Fahrzeug hinzufügen
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AddFahrzeugPage;
