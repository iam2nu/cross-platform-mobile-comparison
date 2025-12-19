import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PasswordGeneratorService from '../../services/PasswordGeneratorService';

interface PasswordGeneratorModalProps {
  visible: boolean;
  onClose: () => void;
  onUsePassword: (password: string) => void;
}

export default function PasswordGeneratorModal({
  visible,
  onClose,
  onUsePassword,
}: PasswordGeneratorModalProps) {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const passwordGenerator = new PasswordGeneratorService();

  useEffect(() => {
    generatePassword();
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols]);

  const generatePassword = () => {
    const newPassword = passwordGenerator.generatePassword({
      length,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    });
    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(password);
    Alert.alert('Kopiert', 'Passwort wurde in die Zwischenablage kopiert');
  };

  const handleUsePassword = () => {
    onUsePassword(password);
    onClose();
  };

  const strength = passwordGenerator.checkPasswordStrength(password);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Passwort generieren</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.passwordContainer}>
              <Text style={styles.password}>{password}</Text>
              <View style={styles.passwordActions}>
                <TouchableOpacity onPress={copyToClipboard} style={styles.actionButton}>
                  <Ionicons name="copy-outline" size={20} color="#2196F3" />
                </TouchableOpacity>
                <TouchableOpacity onPress={generatePassword} style={styles.actionButton}>
                  <Ionicons name="refresh-outline" size={20} color="#2196F3" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.strengthContainer}>
              <View style={styles.strengthBar}>
                <View
                  style={[
                    styles.strengthFill,
                    { width: `${strength.value * 100}%`, backgroundColor: strength.color },
                  ]}
                />
              </View>
              <Text style={[styles.strengthLabel, { color: strength.color }]}>
                {strength.label}
              </Text>
            </View>

            <View style={styles.option}>
              <Text style={styles.optionLabel}>Länge: {length}</Text>
              <Slider
                style={styles.slider}
                minimumValue={4}
                maximumValue={64}
                step={1}
                value={length}
                onValueChange={setLength}
                minimumTrackTintColor="#2196F3"
                maximumTrackTintColor="#ddd"
              />
            </View>

            <View style={styles.option}>
              <Text style={styles.optionLabel}>Kleinbuchstaben (a-z)</Text>
              <Switch
                value={includeLowercase}
                onValueChange={setIncludeLowercase}
                trackColor={{ false: '#ddd', true: '#2196F3' }}
              />
            </View>

            <View style={styles.option}>
              <Text style={styles.optionLabel}>Grossbuchstaben (A-Z)</Text>
              <Switch
                value={includeUppercase}
                onValueChange={setIncludeUppercase}
                trackColor={{ false: '#ddd', true: '#2196F3' }}
              />
            </View>

            <View style={styles.option}>
              <Text style={styles.optionLabel}>Zahlen (0-9)</Text>
              <Switch
                value={includeNumbers}
                onValueChange={setIncludeNumbers}
                trackColor={{ false: '#ddd', true: '#2196F3' }}
              />
            </View>

            <View style={styles.option}>
              <Text style={styles.optionLabel}>Symbole (!@#$...)</Text>
              <Switch
                value={includeSymbols}
                onValueChange={setIncludeSymbols}
                trackColor={{ false: '#ddd', true: '#2196F3' }}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Abbrechen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.useButton} onPress={handleUsePassword}>
              <Text style={styles.useButtonText}>Verwenden</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  passwordContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  password: {
    fontSize: 16,
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  passwordActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
  },
  slider: {
    flex: 1,
    marginLeft: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  useButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  useButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
