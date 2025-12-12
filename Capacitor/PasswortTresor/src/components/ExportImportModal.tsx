import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonTextarea,
  IonText,
  useIonAlert,
  useIonToast,
} from '@ionic/react';
import { close, download, cloudUpload } from 'ionicons/icons';
import StorageService from '../services/StorageService';
import { Clipboard } from '@capacitor/clipboard';

interface ExportImportModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onImportComplete?: () => void;
}

const ExportImportModal: React.FC<ExportImportModalProps> = ({ 
  isOpen, 
  onDismiss,
  onImportComplete 
}) => {
  const [importData, setImportData] = useState('');
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();

  const handleExport = async () => {
    try {
      const credentials = await StorageService.getCredentials();
      const exportData = JSON.stringify(credentials, null, 2);
      
      await Clipboard.write({ string: exportData });
      
      present({
        message: 'Daten in Zwischenablage kopiert',
        duration: 3000,
        color: 'success',
      });
    } catch (error) {
      presentAlert({
        header: 'Fehler',
        message: 'Export fehlgeschlagen',
        buttons: ['OK'],
      });
    }
  };

  const handleImport = async () => {
    if (!importData.trim()) {
      present({
        message: 'Bitte Daten einfügen',
        duration: 2000,
        color: 'warning',
      });
      return;
    }

    presentAlert({
      header: 'Import bestätigen',
      message: 'Dies wird alle bestehenden Einträge überschreiben. Fortfahren?',
      buttons: [
        'Abbrechen',
        {
          text: 'Importieren',
          handler: async () => {
            try {
              const credentials = JSON.parse(importData);
              
              if (!Array.isArray(credentials)) {
                throw new Error('Ungültiges Format');
              }

              // Import each credential
              for (const cred of credentials) {
                await StorageService.addCredential(cred);
              }

              present({
                message: `${credentials.length} Einträge importiert`,
                duration: 3000,
                color: 'success',
              });

              setImportData('');
              if (onImportComplete) {
                onImportComplete();
              }
              onDismiss();
            } catch (error) {
              presentAlert({
                header: 'Fehler',
                message: 'Import fehlgeschlagen. Bitte überprüfen Sie das Format.',
                buttons: ['OK'],
              });
            }
          },
        },
      ],
    });
  };

  const handlePaste = async () => {
    try {
      const { value } = await Clipboard.read();
      setImportData(value);
    } catch (error) {
      present({
        message: 'Einfügen fehlgeschlagen',
        duration: 2000,
        color: 'danger',
      });
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>Export / Import</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Export</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>Exportiert alle Einträge als JSON in die Zwischenablage.</p>
            </IonText>
            <IonButton expand="block" onClick={handleExport}>
              <IonIcon icon={download} slot="start" />
              Exportieren
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Import</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>Importiert Einträge aus JSON-Daten.</p>
            </IonText>
            <IonButton expand="block" fill="outline" onClick={handlePaste} style={{ marginBottom: '16px' }}>
              Aus Zwischenablage einfügen
            </IonButton>
            <IonTextarea
              value={importData}
              onIonInput={(e) => setImportData(e.detail.value!)}
              placeholder="JSON-Daten hier einfügen..."
              rows={10}
              style={{ border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <IonButton expand="block" onClick={handleImport} style={{ marginTop: '16px' }}>
              <IonIcon icon={cloudUpload} slot="start" />
              Importieren
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default ExportImportModal;
