import React from 'react';
import { IonCard, IonCardContent, IonChip, IonText } from '@ionic/react';
import './SearchBar.css';

interface PopularCitiesProps {
    onCitySelect: (cityName: string) => void;
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

const PopularCities: React.FC<PopularCitiesProps> = ({ onCitySelect }) => {
    return (
        <IonCard className="popular-cities-card">
            <IonCardContent>
                <IonText>
                    <h4 className="popular-title">Beliebte Städte</h4>
                </IonText>
                <div className="cities-chips">
                    {popularCities.map((city, index) => (
                        <IonChip
                            key={index}
                            onClick={() => onCitySelect(city)}
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
    );
};

export default PopularCities;
