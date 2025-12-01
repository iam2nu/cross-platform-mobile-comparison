import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import SecureStorageService from '../../services/SecureStorageService';

interface ExportImportModalProps {
  visible: boolean;
  mode: 'export' | 'import';
  onClose: () => void;
  onImportSuccess?: () => void;
}

export default function ExportImportModal({
  visible,
  mode,
  onClose,
  onImportSuccess,
}: ExportImportModalProps) {
  const [exportData, setExportData] = useState('');
  const [importData, setImportData] = useState('');

  const storageService = new SecureStorageService();

  useEffect(() => {
    if (visible && mode === 'export') {
      loadExportData();
    }
  }, [visible, mode]);

  const loadExportData = async () => {
    const data = await storageService.exportCredentials();
    setExportData(data);
  };

  const copyExportData = async () => {
    await Clipboard.setStringAsync(exportData);
    Alert.alert('Kopiert', 'Export-Daten wurden in die Zwischenablage kopiert');
  };

  const handleImport = async () => {
    if (!importData.trim()) {
      Alert.alert('Fehler', 'Bitte fügen Sie die Export-Daten ein');
      return;
    }

    const success = await storageService.importCredentials(importData);

    if (success) {
      Alert.alert('Erfolg', 'Daten erfolgreich importiert');
      setImportData('');
      if (onImportSuccess) onImportSuccess();
      onClose();
    } else {
      Alert.alert('Fehler', 'Fehler beim Importieren der Daten');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === 'export' ? 'Daten exportieren' : 'Daten importieren'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {mode === 'export' ? (
              <>
                <Text style={styles.description}>
                  Exportierte Daten (verschlüsselt):
                </Text>
                <View style={styles.dataContainer}>
                  <ScrollView horizontal>
                    <Text style={styles.dataText}>{exportData}</Text>
                  </ScrollView>
                </View>
                <TouchableOpacity style={styles.copyButton} onPress={copyExportData}>
                  <Ionicons name="copy-outline" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.copyButtonText}>In Zwischenablage kopieren</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.description}>
                  Fügen Sie die Export-Daten ein:
                </Text>
                <TextInput
                  style={styles.importInput}
                  placeholder="Export-Daten einfügen"
                  value={importData}
                  onChangeText={setImportData}
                  multiline
                  numberOfLines={8}
                />
                <TouchableOpacity style={styles.importButton} onPress={handleImport}>
                  <Ionicons name="download-outline" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.importButtonText}>Importieren</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Schließen</Text>
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
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  dataContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dataText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#333',
  },
  importInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: 'monospace',
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  copyButton: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  importButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  closeButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
});
