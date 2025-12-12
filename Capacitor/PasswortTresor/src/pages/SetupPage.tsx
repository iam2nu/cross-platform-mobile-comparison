import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonNote
} from '@ionic/react';
import { eye, eyeOff, shield } from 'ionicons/icons';
import CryptoService from '../services/CryptoService';
import StorageService from '../services/StorageService';

interface SetupPageProps {
  onComplete: () => void;
}

const SetupPage: React.FC<SetupPageProps> = ({ onComplete }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { password?: string; confirm?: string } = {};

    if (!password) {
      newErrors.password = 'Bitte geben Sie ein Passwort ein';
    } else if (password.length < 6) {
      newErrors.password = 'Passwort muss mindestens 6 Zeichen lang sein';
    }

    if (password !== confirmPassword) {
      newErrors.confirm = 'Passwörter stimmen nicht überein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetup = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const hash = await CryptoService.hashPassword(password);
      await StorageService.saveMasterPasswordHash(hash);
      onComplete();
    } catch (error) {
      console.error('Setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Passwort-Tresor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '400px', margin: '40px auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <IonIcon icon={shield} style={{ fontSize: '80px', color: 'var(--ion-color-primary)' }} />
            <h1>Willkommen!</h1>
            <p style={{ color: 'var(--ion-color-medium)' }}>
              Erstellen Sie ein Master-Passwort, um Ihre Passwörter zu schützen
            </p>
          </div>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Master-Passwort einrichten</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel position="stacked">Master-Passwort</IonLabel>
                <IonInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onIonInput={(e) => setPassword(e.detail.value!)}
                  placeholder="Mindestens 6 Zeichen"
                />
                <IonIcon
                  slot="end"
                  icon={showPassword ? eyeOff : eye}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer', marginTop: '20px' }}
                />
              </IonItem>
              {errors.password && (
                <IonNote color="danger" style={{ marginLeft: '16px' }}>
                  {errors.password}
                </IonNote>
              )}

              <IonItem lines="none" style={{ marginTop: '16px' }}>
                <IonLabel position="stacked">Passwort bestätigen</IonLabel>
                <IonInput
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                  placeholder="Passwort wiederholen"
                />
                <IonIcon
                  slot="end"
                  icon={showConfirm ? eyeOff : eye}
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ cursor: 'pointer', marginTop: '20px' }}
                />
              </IonItem>
              {errors.confirm && (
                <IonNote color="danger" style={{ marginLeft: '16px' }}>
                  {errors.confirm}
                </IonNote>
              )}

              <div style={{ padding: '16px 0', color: 'var(--ion-color-danger)' }}>
                <IonText>
                  <small>
                    <strong>Wichtig:</strong> Bewahren Sie Ihr Master-Passwort sicher auf.
                    Es kann nicht wiederhergestellt werden!
                  </small>
                </IonText>
              </div>

              <IonButton
                expand="block"
                onClick={handleSetup}
                disabled={loading || !password || !confirmPassword}
              >
                {loading ? 'Einrichten...' : 'Tresor erstellen'}
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SetupPage;
