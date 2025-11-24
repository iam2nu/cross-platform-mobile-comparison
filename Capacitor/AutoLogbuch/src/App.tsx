import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonPage, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';

/* Pages */
import HomePage from './pages/HomePage';
import AddFahrzeugPage from './pages/AddFahrzeugPage';
import FahrzeugDetailPage from './pages/FahrzeugDetailPage';
import AddWartungPage from './pages/AddWartungPage';
import FahrtenListPage from './pages/FahrtenListPage';
import ActiveFahrtPage from './pages/ActiveFahrtPage';
import FahrtDetailPage from './pages/FahrtDetailPage';

/* Services */
import { initDatabase } from './services/database.service';

setupIonicReact();

const App: React.FC = () => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const init = async () => {
            try {
                await initDatabase();
            } finally {
                setReady(true);
            }
        };
        init();
    }, []);

    if (!ready) {
        return (
            <IonApp>
                <IonPage>
                    <IonContent fullscreen>
                        <div style={{ padding: 24, textAlign: 'center', color: '#888' }}>Daten werden geladen…</div>
                    </IonContent>
                </IonPage>
            </IonApp>
        );
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/add-fahrzeug" component={AddFahrzeugPage} />
                    <Route exact path="/fahrzeug/:id" component={FahrzeugDetailPage} />
                    <Route exact path="/fahrzeug/:id/add-wartung" component={AddWartungPage} />
                    <Route exact path="/fahrzeug/:id/fahrten" component={FahrtenListPage} />
                    <Route exact path="/fahrzeug/:id/active-fahrt" component={ActiveFahrtPage} />
                    <Route exact path="/fahrt/:id" component={FahrtDetailPage} />
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
