import * as Location from 'expo-location';

export interface Position {
    latitude: number;
    longitude: number;
    accuracy: number | null;
    timestamp: number;
}

class LocationService {
    private static instance: LocationService;

    private constructor() { }

    static getInstance(): LocationService {
        if (!LocationService.instance) {
            LocationService.instance = new LocationService();
        }
        return LocationService.instance;
    }

    // Prüfe und fordere Standort-Berechtigung an
    async requestLocationPermission(): Promise<boolean> {
        try {
            const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();

            if (foregroundStatus !== 'granted') {
                return false;
            }

            // Optional: Background-Berechtigung für kontinuierliches Tracking
            const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

            return foregroundStatus === 'granted';
        } catch (error) {
            console.error('Error requesting location permission:', error);
            return false;
        }
    }

    // Hole aktuelle Position
    async getCurrentPosition(): Promise<Position | null> {
        try {
            const hasPermission = await this.hasLocationPermission();
            if (!hasPermission) {
                const granted = await this.requestLocationPermission();
                if (!granted) return null;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                accuracy: location.coords.accuracy,
                timestamp: location.timestamp,
            };
        } catch (error) {
            console.error('Error getting current position:', error);
            return null;
        }
    }

    // Stream für kontinuierliche Standort-Updates (Callback-basiert)
    async watchPosition(
        callback: (position: Position) => void,
        errorCallback?: (error: Error) => void
    ): Promise<{ remove: () => void }> {
        try {
            const hasPermission = await this.hasLocationPermission();
            if (!hasPermission) {
                const granted = await this.requestLocationPermission();
                if (!granted) {
                    throw new Error('Location permission not granted');
                }
            }

            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10, // Update alle 10 Meter
                    timeInterval: 5000, // Update mindestens alle 5 Sekunden
                },
                (location) => {
                    callback({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        accuracy: location.coords.accuracy,
                        timestamp: location.timestamp,
                    });
                }
            );

            return subscription;
        } catch (error) {
            console.error('Error watching position:', error);
            if (errorCallback) {
                errorCallback(error as Error);
            }
            // Return dummy subscription
            return { remove: () => { } };
        }
    }

    // Berechne Distanz zwischen zwei Punkten (in km)
    calculateDistance(
        startLat: number,
        startLng: number,
        endLat: number,
        endLng: number
    ): number {
        const R = 6371; // Radius der Erde in km
        const dLat = this.toRad(endLat - startLat);
        const dLng = this.toRad(endLng - startLng);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(startLat)) *
            Math.cos(this.toRad(endLat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    }

    private toRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    // Prüfe ob Standort-Berechtigung erteilt ist
    async hasLocationPermission(): Promise<boolean> {
        try {
            const { status } = await Location.getForegroundPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error('Error checking location permission:', error);
            return false;
        }
    }

    // Geocoding: Hole Adresse für Koordinaten
    async getAddressFromCoordinates(
        latitude: number,
        longitude: number
    ): Promise<string | null> {
        try {
            const addresses = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (addresses.length > 0) {
                const address = addresses[0];
                const parts = [
                    address.street,
                    address.streetNumber,
                    address.postalCode,
                    address.city,
                ].filter(Boolean);

                return parts.join(' ');
            }

            return null;
        } catch (error) {
            console.error('Error getting address:', error);
            return null;
        }
    }
}

export default LocationService.getInstance();
