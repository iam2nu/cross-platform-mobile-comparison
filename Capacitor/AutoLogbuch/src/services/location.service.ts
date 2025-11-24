import { Geolocation, Position as GeoPosition } from '@capacitor/geolocation';

interface SimplePosition {
    latitude: number;
    longitude: number;
    timestamp: number;
}

class LocationService {
    private watchId: string | null = null;

    async requestPermissions(): Promise<boolean> {
        try {
            const permission = await Geolocation.checkPermissions();
            if (permission.location === 'granted') {
                return true;
            }

            const request = await Geolocation.requestPermissions();
            return request.location === 'granted';
        } catch (error) {
            console.error('Error requesting location permissions:', error);
            return false;
        }
    }

    async getCurrentPosition(): Promise<SimplePosition | null> {
        try {
            const hasPermission = await this.requestPermissions();
            if (!hasPermission) {
                throw new Error('Location permission not granted');
            }

            const position: GeoPosition = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });

            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp
            };
        } catch (error) {
            console.error('Error getting current position:', error);
            return null;
        }
    }

    async watchPosition(callback: (position: SimplePosition) => void): Promise<void> {
        try {
            const hasPermission = await this.requestPermissions();
            if (!hasPermission) {
                throw new Error('Location permission not granted');
            }

            this.watchId = await Geolocation.watchPosition(
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                },
                (position: GeoPosition | null, error) => {
                    if (error) {
                        console.error('Watch position error:', error);
                        return;
                    }

                    if (position) {
                        callback({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            timestamp: position.timestamp
                        });
                    }
                }
            );
        } catch (error) {
            console.error('Error watching position:', error);
        }
    }

    clearWatch(): void {
        if (this.watchId) {
            Geolocation.clearWatch({ id: this.watchId });
            this.watchId = null;
        }
    }

    async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
        try {
            // Using OpenStreetMap Nominatim API for reverse geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'AutoLogbuch/1.0'
                    }
                }
            );

            if (!response.ok) {
                console.error('Geocoding API error:', response.status);
                return null;
            }

            const data = await response.json();
            return data.display_name || null;
        } catch (error) {
            console.error('Error reverse geocoding:', error);
            return null;
        }
    }

    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth radius in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}

export default new LocationService();
