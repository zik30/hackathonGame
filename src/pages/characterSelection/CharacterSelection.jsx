import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CharacterSelection.module.scss';

const CharacterSelection = ({ setSelectedCharacter }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const characters = [
    { id: 1, name: 'Character 1', sprite: '/assets/characters/character1.png' },
    { id: 2, name: 'Character 2', sprite: '/assets/characters/character2.png' },
    { id: 3, name: 'Character 3', sprite: '/assets/characters/character3.png' },
  ];

  const handleSelect = (character) => {
    setSelected(character.id);
    setSelectedCharacter(character.sprite); // Сохраняем выбранного персонажа
  };

  const startGame = () => {
    if (selected) {
      navigate('/game'); // Переход к игре
    } else {
      alert('Выберите персонажа!');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Выберите персонажа</h2>
      <div className={styles.characters}>
        {characters.map((character) => (
          <div
            key={character.id}
            className={`${styles.character} ${selected === character.id ? styles.selected : ''}`}
            onClick={() => handleSelect(character)}
          >
            <img src={character.sprite} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      <button onClick={startGame} className={styles.startButton}>
        Начать игру
      </button>
    </div>
  );
};

export default CharacterSelection;