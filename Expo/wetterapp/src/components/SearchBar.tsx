import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme';

interface SearchBarProps {
    onSearch: (cityName: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (searchText.trim()) {
            onSearch(searchText.trim());
            setSearchText('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Feather
                    name="map-pin"
                    size={20}
                    color={theme.colors.textSecondary}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Stadt eingeben..."
                    placeholderTextColor={theme.colors.textSecondary}
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
            </View>

            <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
                activeOpacity={0.7}
            >
                <Text style={styles.searchButtonText}>Suchen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        alignItems: 'center',
        ...theme.shadows.medium,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        marginRight: theme.spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: theme.fontSize.lg,
        color: theme.colors.text,
        padding: 0,
    },
    searchButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm + 2,
        borderRadius: theme.borderRadius.sm,
        marginLeft: theme.spacing.sm,
    },
    searchButtonText: {
        color: theme.colors.white,
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
    },
});
