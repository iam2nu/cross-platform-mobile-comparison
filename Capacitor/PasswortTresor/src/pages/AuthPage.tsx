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
  IonNote
} from '@ionic/react';
import { lockClosed, eye, eyeOff } from 'ionicons/icons';
import CryptoService from '../services/CryptoService';
import StorageService from '../services/StorageService';

interface AuthPageProps {
  onAuthenticated: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password) {
      setError('Bitte geben Sie Ihr Master-Passwort ein');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const storedHash = await StorageService.getMasterPasswordHash();
      if (!storedHash) {
        setError('Kein Master-Passwort gefunden');
        return;
      }

      const isValid = await CryptoService.verifyPassword(password, storedHash);
      
      if (isValid) {
        onAuthenticated();
      } else {
        setError('Falsches Master-Passwort');
        setPassword('');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Ein Fehler ist aufgetreten');
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
            <IonIcon icon={lockClosed} style={{ fontSize: '80px', color: 'var(--ion-color-primary)' }} />
            <h1>Entsperren</h1>
            <p style={{ color: 'var(--ion-color-medium)' }}>
              Geben Sie Ihr Master-Passwort ein
            </p>
          </div>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Anmeldung</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel position="stacked">Master-Passwort</IonLabel>
                <IonInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onIonInput={(e) => setPassword(e.detail.value!)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleLogin();
                  }}
                  placeholder="Master-Passwort eingeben"
                  autofocus
                />
                <IonIcon
                  slot="end"
                  icon={showPassword ? eyeOff : eye}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer', marginTop: '20px' }}
                />
              </IonItem>

              {error && (
                <IonNote color="danger" style={{ marginLeft: '16px', marginTop: '8px' }}>
                  {error}
                </IonNote>
              )}

              <IonButton
                expand="block"
                onClick={handleLogin}
                disabled={loading || !password}
                style={{ marginTop: '24px' }}
              >
                {loading ? 'Entsperren...' : 'Entsperren'}
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;
