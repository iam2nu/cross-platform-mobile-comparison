import React, { useState } from 'react';
import {
    IonCard,
    IonCardContent,
    IonSearchbar,
    IonButton,
} from '@ionic/react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (cityName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (searchText.trim()) {
            onSearch(searchText.trim());
            setSearchText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <IonCard className="search-card">
                <IonCardContent>
                    <div className="search-box">
                        <IonSearchbar
                            value={searchText}
                            onIonInput={(e) => setSearchText(e.detail.value!)}
                            onKeyPress={handleKeyPress}
                            placeholder="Stadt eingeben..."
                            className="custom-searchbar"
                        />
                        <IonButton
                            onClick={handleSearch}
                            color="primary"
                            className="search-button"
                        >
                            Suchen
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default SearchBar;
