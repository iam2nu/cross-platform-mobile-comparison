import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonIcon, IonFab, IonFabButton, IonSearchbar,
  IonButton, IonButtons, IonRefresher, IonRefresherContent,
  useIonAlert, useIonModal
} from '@ionic/react';
import {
  add, star, starOutline, trash, create, settings, search,
  lockClosed
} from 'ionicons/icons';
import { Credential } from '../models/Credential';
import StorageService from '../services/StorageService';
import CredentialModal from '../components/CredentialModal';

interface HomePageProps {
  onLock: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLock }) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [searchText, setSearchText] = useState('');
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    const creds = await StorageService.getCredentials();
    creds.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setCredentials(creds);
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadCredentials();
    event.detail.complete();
  };

  const toggleFavorite = async (id: string) => {
    await StorageService.toggleFavorite(id);
    loadCredentials();
  };

  const deleteCredential = (cred: Credential) => {
    presentAlert({
      header: 'Eintrag löschen',
      message: `Möchten Sie "${cred.title}" wirklich löschen?`,
      buttons: [
        'Abbrechen',
        {
          text: 'Löschen',
          role: 'destructive',
          handler: async () => {
            await StorageService.deleteCredential(cred.id);
            loadCredentials();
          }
        }
      ]
    });
  };

  const [presentModal, dismissModal] = useIonModal(CredentialModal, {
    onDismiss: () => {
      dismissModal();
      loadCredentials();
    }
  });

  const filteredCredentials = credentials.filter(c =>
    c.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    c.username?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Passwort-Tresor</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onLock}>
              <IonIcon icon={lockClosed} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Suchen..."
            animated
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {filteredCredentials.length === 0 ? (
          <div className="empty-state">
            <IonIcon icon={lockClosed} />
            <h2>Keine Einträge</h2>
            <p>Fügen Sie Ihren ersten Eintrag hinzu</p>
          </div>
        ) : (
          <IonList>
            {filteredCredentials.map(cred => (
              <IonItem
                key={cred.id}
                button
                onClick={() => presentModal({ credential: cred })}
                className="credential-card"
              >
                <div className="credential-avatar" slot="start">
                  {cred.title?.[0]?.toUpperCase() || '?'}
                </div>
                <IonLabel>
                  <h2>
                    {cred.title}
                    {cred.isFavorite && <IonIcon icon={star} className="favorite-star" style={{ marginLeft: '8px' }} />}
                  </h2>
                  <p>{cred.username}</p>
                </IonLabel>
                <IonButton fill="clear" onClick={(e) => { e.stopPropagation(); toggleFavorite(cred.id); }}>
                  <IonIcon icon={cred.isFavorite ? star : starOutline} color={cred.isFavorite ? 'warning' : 'medium'} />
                </IonButton>
                <IonButton fill="clear" color="danger" onClick={(e) => { e.stopPropagation(); deleteCredential(cred); }}>
                  <IonIcon icon={trash} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => presentModal({ credential: null })}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
