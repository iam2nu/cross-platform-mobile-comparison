import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthService from '../services/AuthService';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export default function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [password, setPassword] = useState('');
  const [obscurePassword, setObscurePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  const authService = new AuthService();

  useEffect(() => {
    checkBiometric();
  }, []);

  const checkBiometric = async () => {
    const available = await authService.isBiometricAvailable();
    setBiometricAvailable(available);
  };

  const authenticateWithBiometric = async () => {
    setIsLoading(true);

    try {
      const success = await authService.authenticateWithBiometrics();

      if (success) {
        onAuthenticated();
      } else {
        Alert.alert('Fehler', 'Authentifizierung abgebrochen oder fehlgeschlagen');
      }
    } catch (error) {
      Alert.alert('Fehler', 'Fehler bei der Authentifizierung');
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithPassword = async () => {
    if (!password) {
      Alert.alert('Fehler', 'Bitte geben Sie ein Passwort ein');
      return;
    }

    setIsLoading(true);

    const success = await authService.verifyMasterPassword(password);

    if (success) {
      onAuthenticated();
    } else {
      Alert.alert('Fehler', 'Falsches Passwort');
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Ionicons name="lock-closed" size={80} color="#2196F3" />
        
        <Text style={styles.title}>Passwort-Tresor</Text>

        {biometricAvailable && (
          <>
            <TouchableOpacity
              style={[styles.button, styles.biometricButton]}
              onPress={authenticateWithBiometric}
              disabled={isLoading}
            >
              <Ionicons name="finger-print" size={24} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Mit Biometrie entsperren</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>oder</Text>
          </>
        )}

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Master-Passwort"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={obscurePassword}
            autoCapitalize="none"
            onSubmitEditing={authenticateWithPassword}
          />
          <TouchableOpacity
            onPress={() => setObscurePassword(!obscurePassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={obscurePassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={authenticateWithPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Mit Passwort entsperren</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 48,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  biometricButton: {
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    color: '#999',
    marginBottom: 16,
  },
});
