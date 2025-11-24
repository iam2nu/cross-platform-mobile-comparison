import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.autologbuch.app',
    appName: 'Auto-Logbuch',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        Geolocation: {
            enabled: true
        },
        Preferences: {
            enabled: true
        }
    }
};

export default config;
