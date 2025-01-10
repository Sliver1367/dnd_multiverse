import React, { useState } from "react";

const CharacterCreator = () => {
  const [character, setCharacter] = useState({
    name: "",
    race: "",
    class: "",
    level: 1,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (Object.keys(character.attributes).includes(name)) {
      setCharacter((prev) => ({
        ...prev,
        attributes: { ...prev.attributes, [name]: parseInt(value) }
      }));
    } else {
      setCharacter((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Создан персонаж:", character);
    alert("Персонаж создан!");
  };

  return (
    <div className="character-creator">
      <h2>Создание персонажа</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input
            type="text"
            name="name"
            value={character.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Раса:
          <input
            type="text"
            name="race"
            value={character.race}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Класс:
          <input
            type="text"
            name="class"
            value={character.class}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Уровень:
          <input
            type="number"
            name="level"
            value={character.level}
            min="1"
            onChange={handleInputChange}
          />
        </label>

        <h3>Характеристики</h3>
        {Object.keys(character.attributes).map((attr) => (
          <label key={attr}>
            {attr}:
            <input
              type="number"
              name={attr}
              value={character.attributes[attr]}
              min="1"
              max="20"
              onChange={handleInputChange}
            />
          </label>
        ))}

        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CharacterCreator;
