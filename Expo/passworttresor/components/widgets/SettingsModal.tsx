import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import SecureStorageService from '../../services/SecureStorageService';
import AutoLockService from '../../services/AutoLockService';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onExport: () => void;
  onImport: () => void;
}

export default function SettingsModal({
  visible,
  onClose,
  onExport,
  onImport,
}: SettingsModalProps) {
  const [autoLockTimeout, setAutoLockTimeout] = useState(5);

  const storageService = new SecureStorageService();
  const autoLockService = AutoLockService.getInstance();

  useEffect(() => {
    loadSettings();
  }, [visible]);

  const loadSettings = async () => {
    const settings = await storageService.getSettings();
    setAutoLockTimeout(settings.autoLockTimeout);
  };

  const saveSettings = async () => {
    await storageService.saveSettings({ autoLockTimeout });
    autoLockService.updateTimeout(autoLockTimeout);
    Alert.alert('Erfolg', 'Einstellungen gespeichert');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Einstellungen</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sicherheit</Text>
              
              <View style={styles.setting}>
                <Text style={styles.settingLabel}>Auto-Lock Timeout</Text>
                <Text style={styles.settingValue}>{autoLockTimeout} Minuten</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={30}
                step={1}
                value={autoLockTimeout}
                onValueChange={setAutoLockTimeout}
                minimumTrackTintColor="#2196F3"
                maximumTrackTintColor="#ddd"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Daten</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={onExport}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="cloud-upload-outline" size={24} color="#2196F3" />
                  <Text style={styles.menuItemText}>Exportieren</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={onImport}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="cloud-download-outline" size={24} color="#2196F3" />
                  <Text style={styles.menuItemText}>Importieren</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Abbrechen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
              <Text style={styles.saveButtonText}>Speichern</Text>
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
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
  slider: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
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
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
