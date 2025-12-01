import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Credential } from '../models/Credential';
import SecureStorageService from '../services/SecureStorageService';
import AutoLockService from '../services/AutoLockService';
import CredentialDetailModal from '../components/widgets/CredentialDetailModal';
import SettingsModal from '../components/widgets/SettingsModal';
import ExportImportModal from '../components/widgets/ExportImportModal';

interface HomeScreenProps {
  onLock: () => void;
}

export default function HomeScreen({ onLock }: HomeScreenProps) {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const storageService = new SecureStorageService();
  const autoLockService = AutoLockService.getInstance();

  useEffect(() => {
    initializeAutoLock();
    loadCredentials();
  }, []);

  const initializeAutoLock = async () => {
    const settings = await storageService.getSettings();
    autoLockService.initialize(settings.autoLockTimeout, onLock);
  };

  const loadCredentials = async () => {
    setIsLoading(true);
    const creds = await storageService.getCredentials();
    creds.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setCredentials(creds);
    setIsLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCredentials();
    setRefreshing(false);
  }, []);

  const toggleFavorite = async (id: string) => {
    await storageService.toggleFavorite(id);
    loadCredentials();
  };

  const deleteCredential = (credential: Credential) => {
    Alert.alert(
      'Eintrag löschen',
      `Möchten Sie "${credential.title}" wirklich löschen?`,
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            await storageService.deleteCredential(credential.id);
            loadCredentials();
          },
        },
      ]
    );
  };

  const openDetailModal = (credential: Credential) => {
    setSelectedCredential(credential);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedCredential(null);
    loadCredentials();
  };

  const filteredCredentials = searchQuery
    ? credentials.filter(
        (c) =>
          c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.username?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : credentials;

  const renderCredentialItem = ({ item }: { item: Credential }) => (
    <TouchableOpacity
      style={styles.credentialCard}
      onPress={() => openDetailModal(item)}
    >
      <View style={styles.credentialHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.title?.[0]?.toUpperCase() || '?'}</Text>
          </View>
          {item.isFavorite && (
            <View style={styles.favoriteBadge}>
              <Ionicons name="star" size={12} color="#FFC107" />
            </View>
          )}
        </View>
        <View style={styles.credentialInfo}>
          <Text style={styles.credentialTitle}>{item.title}</Text>
          <Text style={styles.credentialUsername}>{item.username}</Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteCredential(item)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color="#f44336" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Passwort-Tresor</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => setShowSearch(!showSearch)}
            style={styles.headerButton}
          >
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowSettingsModal(true)}
            style={styles.headerButton}
          >
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {showSearch && (
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Suchen..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {isLoading ? (
        <View style={styles.emptyContainer}>
          <Text>Lädt...</Text>
        </View>
      ) : filteredCredentials.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="lock-open-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Keine Einträge vorhanden</Text>
          <Text style={styles.emptySubtext}>Fügen Sie einen neuen Eintrag hinzu</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCredentials}
          renderItem={renderCredentialItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setSelectedCredential(null);
          setShowDetailModal(true);
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {showDetailModal && (
        <CredentialDetailModal
          credential={selectedCredential}
          visible={showDetailModal}
          onClose={closeDetailModal}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <SettingsModal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onExport={() => {
          setShowSettingsModal(false);
          setShowExportModal(true);
        }}
        onImport={() => {
          setShowSettingsModal(false);
          setShowImportModal(true);
        }}
      />

      <ExportImportModal
        visible={showExportModal || showImportModal}
        mode={showExportModal ? 'export' : 'import'}
        onClose={() => {
          setShowExportModal(false);
          setShowImportModal(false);
        }}
        onImportSuccess={loadCredentials}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    padding: 8,
  },
  credentialCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  credentialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  credentialInfo: {
    flex: 1,
    marginLeft: 12,
  },
  credentialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  credentialUsername: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
