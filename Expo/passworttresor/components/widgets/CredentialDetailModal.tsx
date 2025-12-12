import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { Credential } from '../../models/Credential';
import AddEditCredentialScreen from '../../screens/AddEditCredentialScreen';

interface CredentialDetailModalProps {
  credential: Credential | null;
  visible: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export default function CredentialDetailModal({
  credential,
  visible,
  onClose,
  onToggleFavorite,
}: CredentialDetailModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(!credential || !credential.id);

  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Kopiert', `${label} wurde in die Zwischenablage kopiert`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  if (isEditing) {
    return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <AddEditCredentialScreen
          credential={credential || undefined}
          onSave={() => {
            setIsEditing(false);
            onClose();
          }}
          onCancel={() => {
            if (!credential || !credential.id) {
              onClose();
            } else {
              setIsEditing(false);
            }
          }}
        />
      </Modal>
    );
  }

  if (!credential) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>{credential.title}</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => onToggleFavorite(credential.id)}
                style={styles.iconButton}
              >
                <Ionicons
                  name={credential.isFavorite ? 'star' : 'star-outline'}
                  size={24}
                  color={credential.isFavorite ? '#FFC107' : '#666'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.iconButton}>
                <Ionicons name="create-outline" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.field}>
              <Text style={styles.label}>Benutzername</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{credential.username}</Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(credential.username, 'Benutzername')}
                  style={styles.copyButton}
                >
                  <Ionicons name="copy-outline" size={20} color="#2196F3" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Passwort</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>
                  {showPassword ? credential.password : '•'.repeat(credential.password?.length || 0)}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.copyButton}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => copyToClipboard(credential.password, 'Passwort')}
                  style={styles.copyButton}
                >
                  <Ionicons name="copy-outline" size={20} color="#2196F3" />
                </TouchableOpacity>
              </View>
            </View>

            {credential.url && (
              <View style={styles.field}>
                <Text style={styles.label}>URL</Text>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>{credential.url}</Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(credential.url!, 'URL')}
                    style={styles.copyButton}
                  >
                    <Ionicons name="copy-outline" size={20} color="#2196F3" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {credential.notes && (
              <View style={styles.field}>
                <Text style={styles.label}>Notizen</Text>
                <Text style={styles.value}>{credential.notes}</Text>
              </View>
            )}

            <View style={styles.metadata}>
              <Text style={styles.metadataText}>Erstellt: {formatDate(credential.createdAt)}</Text>
              {credential.modifiedAt && (
                <Text style={styles.metadataText}>
                  Geändert: {formatDate(credential.modifiedAt)}
                </Text>
              )}
            </View>
          </ScrollView>
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
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 4,
  },
  iconButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  copyButton: {
    padding: 8,
    marginLeft: 8,
  },
  metadata: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  metadataText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});
