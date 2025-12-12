import React, { useState, useEffect } from 'react';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonButtons, IonItem, IonLabel, IonInput, IonTextarea, IonIcon,
  IonNote, useIonToast
} from '@ionic/react';
import { close, eye, eyeOff, sparkles, copy } from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';
import { Credential, createCredential } from '../models/Credential';
import StorageService from '../services/StorageService';
import PasswordGeneratorService from '../services/PasswordGeneratorService';

interface CredentialModalProps {
  credential: Credential | null;
  onDismiss: () => void;
  isOpen: boolean;
}

const CredentialModal: React.FC<CredentialModalProps> = ({ credential, onDismiss, isOpen }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [present] = useIonToast();

  useEffect(() => {
    if (isOpen) {
      if (credential) {
        setTitle(credential.title);
        setUsername(credential.username);
        setPassword(credential.password);
        setUrl(credential.url || '');
        setNotes(credential.notes || '');
      } else {
        // Reset for new entry
        setTitle('');
        setUsername('');
        setPassword('');
        setUrl('');
        setNotes('');
        setErrors({});
        setShowPassword(false);
      }
    }
  }, [credential, isOpen]);

  const validate = () => {
    const newErrors: any = {};
    if (!title) newErrors.title = 'Titel ist erforderlich';
    if (!username) newErrors.username = 'Benutzername ist erforderlich';
    if (!password) newErrors.password = 'Passwort ist erforderlich';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const newCred = createCredential({
      id: credential?.id,
      title,
      username,
      password,
      url,
      notes,
      isFavorite: credential?.isFavorite || false,
      passwordHistory: credential?.passwordHistory || []
    });

    if (credential) {
      await StorageService.updateCredential(newCred);
    } else {
      await StorageService.addCredential(newCred);
    }

    onDismiss();
  };

  const generatePassword = () => {
    const generated = PasswordGeneratorService.generatePassword({
      length: 16,
      includeLowercase: true,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: true
    });
    setPassword(generated);
  };

  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.write({ string: text });
    present({
      message: `${label} kopiert`,
      duration: 2000,
      color: 'success'
    });
  };

  const strength = PasswordGeneratorService.calculateStrength(password);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>{credential ? 'Bearbeiten' : 'Neuer Eintrag'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>Speichern</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Titel *</IonLabel>
          <IonInput value={title} onIonInput={(e) => setTitle(e.detail.value!)} placeholder="z.B. Gmail" />
        </IonItem>
        {errors.title && <IonNote color="danger">{errors.title}</IonNote>}

        <IonItem>
          <IonLabel position="stacked">Benutzername *</IonLabel>
          <IonInput value={username} onIonInput={(e) => setUsername(e.detail.value!)} placeholder="E-Mail oder Benutzername" />
          <IonButton fill="clear" slot="end" onClick={() => copyToClipboard(username, 'Benutzername')}>
            <IonIcon icon={copy} />
          </IonButton>
        </IonItem>
        {errors.username && <IonNote color="danger">{errors.username}</IonNote>}

        <IonItem>
          <IonLabel position="stacked">Passwort *</IonLabel>
          <IonInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
            placeholder="Passwort"
          />
          <IonButton fill="clear" slot="end" onClick={() => setShowPassword(!showPassword)}>
            <IonIcon icon={showPassword ? eyeOff : eye} />
          </IonButton>
          <IonButton fill="clear" slot="end" onClick={generatePassword}>
            <IonIcon icon={sparkles} />
          </IonButton>
          <IonButton fill="clear" slot="end" onClick={() => copyToClipboard(password, 'Passwort')}>
            <IonIcon icon={copy} />
          </IonButton>
        </IonItem>
        {errors.password && <IonNote color="danger">{errors.password}</IonNote>}
        {password && (
          <div style={{ padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <small>{strength.label}</small>
              <small>{password.length} Zeichen</small>
            </div>
            <div className="password-strength" style={{ background: strength.color, width: `${(strength.score / 5) * 100}%` }} />
          </div>
        )}

        <IonItem>
          <IonLabel position="stacked">URL</IonLabel>
          <IonInput value={url} onIonInput={(e) => setUrl(e.detail.value!)} placeholder="https://..." />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Notizen</IonLabel>
          <IonTextarea value={notes} onIonInput={(e) => setNotes(e.detail.value!)} rows={4} />
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default CredentialModal;
