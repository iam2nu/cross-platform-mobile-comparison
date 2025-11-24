import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.wetterapp.capacitor',
    appName: 'WetterApp',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        Network: {
            enabled: true
        }
    }
};

export default config;
