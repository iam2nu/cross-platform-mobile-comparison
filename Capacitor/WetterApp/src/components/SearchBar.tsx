import React, { useState } from 'react';
import {
    IonCard,
    IonCardContent,
    IonSearchbar,
    IonButton,
    IonChip,
    IonText,
} from '@ionic/react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (cityName: string) => void;
}

const popularCities = [
    'Dietikon',
    'Zürich',
    'Winterthur',
    'Schlieren',
    'Neuenhof',
    'Baden',
    'Urdorf',
    'Bassersdorf',
];

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

            <IonCard className="popular-cities-card">
                <IonCardContent>
                    <IonText>
                        <h4 className="popular-title">Beliebte Städte</h4>
                    </IonText>
                    <div className="cities-chips">
                        {popularCities.map((city, index) => (
                            <IonChip
                                key={index}
                                onClick={() => onSearch(city)}
                                color="primary"
                                outline
                                className="city-chip"
                            >
                                {city}
                            </IonChip>
                        ))}
                    </div>
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default SearchBar;
