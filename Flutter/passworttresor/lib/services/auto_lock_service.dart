import 'dart:async';
import 'package:flutter/material.dart';

class AutoLockService {
  static final AutoLockService _instance = AutoLockService._internal();
  factory AutoLockService() => _instance;
  AutoLockService._internal();

  Timer? _timer;
  int _timeoutMinutes = 5;
  VoidCallback? _onLock;

  void initialize(int timeoutMinutes, VoidCallback onLock) {
    _timeoutMinutes = timeoutMinutes;
    _onLock = onLock;
    resetTimer();
  }

  void resetTimer() {
    _timer?.cancel();
    _timer = Timer(Duration(minutes: _timeoutMinutes), () {
      _onLock?.call();
    });
  }

  void dispose() {
    _timer?.cancel();
  }

  void updateTimeout(int minutes) {
    _timeoutMinutes = minutes;
    resetTimer();
  }
}
