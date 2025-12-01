import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:geocoding/geocoding.dart';

class LocationService {
  static final LocationService _instance = LocationService._internal();
  factory LocationService() => _instance;
  LocationService._internal();

  // Prüfe und fordere Standort-Berechtigung an
  Future<bool> requestLocationPermission() async {
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

  // Stream für kontinuierliche Standort-Updates
  Stream<Position> getPositionStream() {
    return Geolocator.getPositionStream(
      locationSettings: const LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 10, // Update alle 10 Meter
        timeLimit: Duration(seconds: 5), // Update mindestens alle 5 Sekunden
      ),
    );
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
      print("Fehler beim Geocoding: $e");
      return null;
    }
  }
}
