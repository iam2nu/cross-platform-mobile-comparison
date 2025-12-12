import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import StorageService from '../services/StorageService';
import { Settings } from '../models/Settings';

interface SettingsModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onDismiss }) => {
  const [autoLockTimeout, setAutoLockTimeout] = useState(5);

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    const settings = await StorageService.getSettings();
    setAutoLockTimeout(settings.autoLockTimeout);
  };

  const handleSave = async () => {
    const currentSettings = await StorageService.getSettings();
    const settings: Settings = {
      ...currentSettings,
      autoLockTimeout,
    };
    await StorageService.saveSettings(settings);
    onDismiss();
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
          <IonTitle>Einstellungen</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>Speichern</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Sicherheit</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>Auto-Lock Timeout</IonLabel>
            <IonSelect
              value={autoLockTimeout}
              onIonChange={(e) => setAutoLockTimeout(e.detail.value)}
            >
              <IonSelectOption value={1}>1 Minute</IonSelectOption>
              <IonSelectOption value={2}>2 Minuten</IonSelectOption>
              <IonSelectOption value={5}>5 Minuten</IonSelectOption>
              <IonSelectOption value={10}>10 Minuten</IonSelectOption>
              <IonSelectOption value={15}>15 Minuten</IonSelectOption>
              <IonSelectOption value={30}>30 Minuten</IonSelectOption>
              <IonSelectOption value={0}>Nie</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default SettingsModal;
