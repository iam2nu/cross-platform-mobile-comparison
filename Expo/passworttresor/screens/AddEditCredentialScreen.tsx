import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Credential, createCredential } from '../models/Credential';
import SecureStorageService from '../services/SecureStorageService';
import PasswordGeneratorService from '../services/PasswordGeneratorService';
import PasswordGeneratorModal from '../components/widgets/PasswordGeneratorModal';

interface AddEditCredentialScreenProps {
  credential?: Credential;
  onSave: () => void;
  onCancel: () => void;
}

export default function AddEditCredentialScreen({
  credential,
  onSave,
  onCancel,
}: AddEditCredentialScreenProps) {
  const [title, setTitle] = useState(credential?.title || '');
  const [username, setUsername] = useState(credential?.username || '');
  const [password, setPassword] = useState(credential?.password || '');
  const [notes, setNotes] = useState(credential?.notes || '');
  const [obscurePassword, setObscurePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const storageService = new SecureStorageService();
  const passwordGenerator = new PasswordGeneratorService();

  const passwordStrength = passwordGenerator.checkPasswordStrength(password);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Bitte geben Sie einen Titel ein';
    }
    if (!username.trim()) {
      newErrors.username = 'Bitte geben Sie einen Benutzernamen ein';
    }
    if (!password.trim()) {
      newErrors.password = 'Bitte geben Sie ein Passwort ein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveCredential = async () => {
    if (!validate()) return;

    setIsLoading(true);

    let updatedPasswordHistory = [...(credential?.passwordHistory || [])];

    if (credential && credential.password !== password) {
      updatedPasswordHistory = [credential.password, ...updatedPasswordHistory];
      if (updatedPasswordHistory.length > 5) {
        updatedPasswordHistory = updatedPasswordHistory.slice(0, 5);
      }
    }

    const newCredential = createCredential({
      id: credential?.id,
      title: title.trim(),
      username: username.trim(),
      password: password.trim(),
      notes: notes.trim() || undefined,
      createdAt: credential?.createdAt,
      modifiedAt: credential ? new Date().toISOString() : undefined,
      isFavorite: credential?.isFavorite,
      passwordHistory: updatedPasswordHistory,
    });

    try {
      if (credential) {
        await storageService.updateCredential(newCredential);
      } else {
        await storageService.addCredential(newCredential);
      }
      onSave();
    } catch (error) {
      Alert.alert('Fehler', 'Fehler beim Speichern');
      setIsLoading(false);
    }
  };

  const showPasswordHistory = () => {
    if (!credential || !credential.passwordHistory || credential.passwordHistory.length === 0) {
      Alert.alert('Info', 'Keine Passwort-Historie vorhanden');
      return;
    }

    Alert.alert(
      'Passwort-Historie',
      'Wählen Sie ein altes Passwort zum Wiederherstellen',
      [
        ...credential.passwordHistory.map((pwd, index) => ({
          text: pwd?.substring(0, 20) + (pwd?.length > 20 ? '...' : ''),
          onPress: () => setPassword(pwd || ''),
        })),
        { text: 'Abbrechen', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.headerButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {credential ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}
        </Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Titel</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="pricetag-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="z.B. Gmail, Facebook, Bank"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Benutzername</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-Mail oder Benutzername"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Passwort</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Passwort"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={obscurePassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPasswordGenerator(true)}
              style={styles.iconButton}
            >
              <Ionicons name="sparkles-outline" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setObscurePassword(!obscurePassword)}
              style={styles.iconButton}
            >
              <Ionicons
                name={obscurePassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          
          {password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBar}>
                <View
                  style={[
                    styles.strengthFill,
                    { width: `${passwordStrength.value * 100}%`, backgroundColor: passwordStrength.color },
                  ]}
                />
              </View>
              <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                {passwordStrength.label}
              </Text>
            </View>
          )}

          {credential && credential.passwordHistory && credential.passwordHistory.length > 0 && (
            <TouchableOpacity onPress={showPasswordHistory} style={styles.historyButton}>
              <Ionicons name="time-outline" size={16} color="#2196F3" />
              <Text style={styles.historyButtonText}>Passwort-Historie anzeigen</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notizen (optional)</Text>
          <View style={[styles.inputWrapper, styles.notesInput]}>
            <Ionicons name="document-text-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Zusätzliche Informationen"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.buttonDisabled]}
          onPress={saveCredential}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>
              {credential ? 'Änderungen speichern' : 'Eintrag hinzufügen'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <PasswordGeneratorModal
        visible={showPasswordGenerator}
        onClose={() => setShowPasswordGenerator(false)}
        onUsePassword={setPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 50,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    minHeight: 50,
  },
  notesInput: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginRight: 8,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  historyButtonText: {
    color: '#2196F3',
    fontSize: 14,
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
