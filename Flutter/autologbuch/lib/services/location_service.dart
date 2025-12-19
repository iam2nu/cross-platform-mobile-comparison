import 'dart:io' show Platform;
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:geocoding/geocoding.dart';
import 'dart:developer' as developer;

class LocationService {
  static final LocationService _instance = LocationService._internal();
  factory LocationService() => _instance;
  LocationService._internal();

  // Prüfe und fordere Standort-Berechtigung an (inkl. Hintergrund)
  Future<bool> requestLocationPermission({bool requestBackground = true}) async {
    // Prüfe ob Location Services aktiviert sind
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return false;
    }

    // Prüfe aktuelle Berechtigung
    LocationPermission permission = await Geolocator.checkPermission();

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return false;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Öffne App-Einstellungen
      await openAppSettings();
      return false;
    }

    // Fordere Hintergrund-Berechtigung an (für kontinuierliches Tracking)
    if (requestBackground && permission == LocationPermission.whileInUse) {
      // Versuche auf "always" zu upgraden
      permission = await Geolocator.requestPermission();
    }

    return true;
  }

  // Hole aktuelle Position
  Future<Position?> getCurrentPosition() async {
    try {
      bool hasPermission = await requestLocationPermission();
      if (!hasPermission) return null;

      Position position = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          distanceFilter: 10, // Update alle 10 Meter
        ),
      );
      return position;
    } catch (e) {
      return null;
    }
  }

  // Stream für kontinuierliche Standort-Updates (auch im Hintergrund)
  Stream<Position> getPositionStream() {
    if (Platform.isAndroid) {
      return Geolocator.getPositionStream(
        locationSettings: AndroidSettings(
          accuracy: LocationAccuracy.high,
          distanceFilter: 5,
          intervalDuration: const Duration(seconds: 5),
          foregroundNotificationConfig: const ForegroundNotificationConfig(
            notificationText: "Fahrt wird aufgezeichnet",
            notificationTitle: "Autologbuch",
            enableWakeLock: false, // Deaktiviert wegen Permission-Problem
          ),
        ),
      );
    } else if (Platform.isIOS) {
      return Geolocator.getPositionStream(
        locationSettings: AppleSettings(
          accuracy: LocationAccuracy.high,
          distanceFilter: 5,
          pauseLocationUpdatesAutomatically: false,
          showBackgroundLocationIndicator: true,
        ),
      );
    } else {
      return Geolocator.getPositionStream(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          distanceFilter: 5,
        ),
      );
    }
  }

  // Berechne Distanz zwischen zwei Punkten (in km)
  double calculateDistance(
    double startLat,
    double startLng,
    double endLat,
    double endLng,
  ) {
    return Geolocator.distanceBetween(startLat, startLng, endLat, endLng) /
        1000;
  }

  // Prüfe ob Standort-Berechtigung erteilt ist
  Future<bool> hasLocationPermission() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) return false;

    LocationPermission permission = await Geolocator.checkPermission();
    return permission == LocationPermission.whileInUse ||
        permission == LocationPermission.always;
  }

  // Konvertiere Koordinaten in eine lesbare Adresse
  Future<String?> getAddressFromCoordinates(double lat, double lng) async {
    try {
      // Ruft die native Plattform-API auf (kein API-Key nötig!)
      List<Placemark> placemarks = await placemarkFromCoordinates(lat, lng);

      if (placemarks.isNotEmpty) {
        Placemark place = placemarks.first;
        return "${place.street} ${place.subThoroughfare ?? ''}, ${place.postalCode} ${place.locality}";
      }
      return null;
    } catch (e) {
      developer.log('Fehler beim Geocoding: $e', name: 'LocationService');
      return null;
    }
  }
}
