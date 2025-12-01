import React, { useState, useEffect } from 'react';
import { IonApp, IonSpinner, setupIonicReact } from '@ionic/react';
import SetupPage from './pages/SetupPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import StorageService from './services/StorageService';

setupIonicReact();

type AppState = 'loading' | 'setup' | 'auth' | 'home';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('loading');

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    const hasMasterPassword = await StorageService.hasMasterPassword();
    setAppState(hasMasterPassword ? 'auth' : 'setup');
  };

  const handleSetupComplete = () => {
    setAppState('home');
  };

  const handleAuthenticated = () => {
    setAppState('home');
  };

  const handleLock = () => {
    setAppState('auth');
  };

  if (appState === 'loading') {
    return (
      <IonApp>
        <div className="loading-container">
          <IonSpinner name="crescent" color="primary" />
        </div>
      </IonApp>
    );
  }

  return (
    <IonApp>
      {appState === 'setup' && <SetupPage onComplete={handleSetupComplete} />}
      {appState === 'auth' && <AuthPage onAuthenticated={handleAuthenticated} />}
      {appState === 'home' && <HomePage onLock={handleLock} />}
    </IonApp>
  );
};

export default App;
